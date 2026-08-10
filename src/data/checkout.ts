/*
  Single source of truth for the checkout funnel:

    /checkout/           step 1, customer details
    /checkout/confirmed/ step 2, thank you

  There is deliberately no payment step. Nothing is charged on this site: the
  customer submits their details, and we reach out on WhatsApp or email within
  10 to 30 minutes to confirm the order and take payment. So the funnel ends at
  the thank-you page.

  The site builds static (astro.config.mjs, output: 'static'), so there is no
  server at request time. The funnel therefore runs client-side: the plan comes
  in on ?plan=, the order object lives in sessionStorage between the two pages,
  and the order reference is minted in the browser.

  Because of that, sessionStorage is customer-writable input, not our own state.
  The confirmation page reads it back through `parseOrder`, which revalidates
  the record field by field and re-derives everything derivable — above all the
  price, which comes from `packages` here and never from what was stored. A
  tampered record is rejected outright rather than rendered.
*/
import { packages } from './site';

/** sessionStorage key holding the in-flight order. Bump the suffix if `Order` changes shape. */
export const ORDER_KEY = 'ukib.order.v1';

/**
  Order references this browser has already handed out.

  localStorage rather than sessionStorage on purpose: a repeat customer opening
  a fresh tab next week must not be able to draw a reference they were already
  given, because the reference is what ties a WhatsApp conversation to an order.
*/
export const ISSUED_KEY = 'ukib.issued.v1';

/** How many past references to keep. Well past any plausible repeat-order history. */
const ISSUED_MAX = 250;

/** How long we tell the customer to expect a reply. Used in the page copy. */
export const REPLY_WINDOW = '10 to 30 minutes';

/**
  Endpoint the browser pings when an order is confirmed. Served by
  functions/api/order.ts, which relays to the same Telegram chat as
  bestiptvbox.ca — the message names the site it came from.

  The call stays fire-and-forget. Support hearing about an order is not worth
  making a customer wait on a third-party API, and the thank-you page tells
  them we will be in touch either way.
*/
export const ORDER_WEBHOOK = '/api/order';

/** Why they are ordering. Tells support whether to provision fresh or extend. */
export const orderTypes = [
  { value: 'first-time', label: 'First-time customer' },
  { value: 'renewal', label: 'Renewing my subscription' },
  { value: 'extra-device', label: 'Adding another device' },
] as const;

/**
  Device the subscription will be set up on. Wording matches how customers
  describe their own hardware, not how the installation guides are titled.
*/
export const deviceOptions = [
  { value: 'firestick', label: 'Fire Stick / Cube / Fire TV' },
  { value: 'android-box', label: 'Android TV Box' },
  { value: 'formuler', label: 'Formuler Z / Dreamlink' },
  { value: 'mag', label: 'MAG box' },
  { value: 'smart-tv', label: 'Smart TV (Samsung, LG, Sony)' },
  { value: 'apple', label: 'Apple TV / iPhone / iPad' },
  { value: 'android-phone', label: 'Android phone or tablet' },
  { value: 'computer', label: 'Mac / Windows computer' },
  { value: 'other', label: 'Other device' },
] as const;

/** How they would rather be contacted first. Both are collected either way. */
export const contactPreferences = [
  { value: 'whatsapp', label: 'WhatsApp (fastest)' },
  { value: 'email', label: 'Email' },
] as const;

export type OrderTypeValue = (typeof orderTypes)[number]['value'];
export type DeviceValue = (typeof deviceOptions)[number]['value'];
export type ContactValue = (typeof contactPreferences)[number]['value'];

/**
  The order as it is written to sessionStorage.

  Labels are stored alongside the machine values on purpose: support reads them
  back, and "Formuler Z / Dreamlink" is worth more there than "formuler". They
  are re-derived on every read, so a tampered label cannot reach anyone.
*/
export interface Order {
  /** Schema version, so a future shape change can be detected instead of crashing. */
  v: 1;
  /** Ten digits. The reference the customer quotes on WhatsApp. See `mintOrderNumber`. */
  number: string;
  planId: string;
  planLabel: string;
  price: number;
  fullName: string;
  email: string;
  /** Readable form, "+44 7441 346459". What the recap screen shows. */
  phone: string;
  /** Digits only, "+447441346459". Drops straight into a wa.me link. */
  phoneE164: string;
  /** ISO 3166-1 alpha-2 of the calling code they picked, e.g. 'GB'. */
  phoneCountry: string;
  orderType: OrderTypeValue;
  orderTypeLabel: string;
  device: DeviceValue;
  deviceLabel: string;
  contact: ContactValue;
  contactLabel: string;
  /** Optional free-text note. May be empty. */
  notes: string;
  /** Epoch ms. */
  createdAt: number;
}

/* -------------------------------------------------------------------------- */
/* Input cleaning                                                             */
/* -------------------------------------------------------------------------- */

/**
  Longest value accepted for each free-text field. Without a cap, a form post
  or a hand-edited storage record can carry megabytes into whatever reads it.
  Email is the RFC 5321 maximum; the others are generous for real values.
*/
export const FIELD_LIMITS = {
  fullName: 80,
  email: 254,
  phone: 24,
  notes: 300,
} as const;

/**
  Normalise one free-text field.

  Drops Unicode control and format characters — which covers the
  right-to-left override trick used to make a reference read as something other
  than what it is — strips angle brackets, which none of these fields can
  legitimately contain and which are what turns a name into markup downstream,
  collapses whitespace, then caps the length.
*/
export const clean = (value: unknown, max: number): string =>
  typeof value === 'string'
    ? value
        .replace(/[\p{Cc}\p{Cf}]/gu, '')
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max)
    : '';

/** Digits only, bounded by the E.164 ceiling of 15 including the country code. */
export const nationalDigits = (value: string) => value.replace(/\D/g, '').slice(0, 15);

export const isValidName = (v: string) => v.length >= 2 && /\p{L}/u.test(v);

/*
  Deliberately loose. A stricter pattern rejects more valid addresses than it
  catches typos, and the address is shown back to the customer on the next
  screen anyway. The bounds that matter for safety — length, whitespace,
  angle brackets — are enforced by `clean` and the cap below.
*/
export const isValidEmail = (v: string) =>
  v.length <= FIELD_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** The country code lives in its own control, so only the national number is measured. */
export const isValidPhone = (v: string) => nationalDigits(v).length >= 6;

export const isOrderType = (v: unknown): v is OrderTypeValue =>
  orderTypes.some((o) => o.value === v);

export const isDevice = (v: unknown): v is DeviceValue =>
  deviceOptions.some((d) => d.value === v);

export const isContact = (v: unknown): v is ContactValue =>
  contactPreferences.some((c) => c.value === v);

const orderTypeLabel = (v: OrderTypeValue) => orderTypes.find((o) => o.value === v)!.label;
const deviceLabel = (v: DeviceValue) => deviceOptions.find((d) => d.value === v)!.label;
const contactLabel = (v: ContactValue) => contactPreferences.find((c) => c.value === v)!.label;

/* -------------------------------------------------------------------------- */
/* Order references                                                           */
/* -------------------------------------------------------------------------- */

/** Day zero for the date prefix. Fixed, so the prefix is comparable across builds. */
const NUMBER_EPOCH = Date.UTC(2026, 0, 1);

/**
  Uniform random integer in [0, bound).

  Rejection sampling rather than `% bound`: a plain modulo over a uint32 makes
  the low values of the range fractionally more likely, and this number is the
  reconciliation key, so it should be flat. Falls back to Math.random only
  where crypto is genuinely absent.
*/
const randomBelow = (bound: number): number => {
  const c = globalThis.crypto;
  if (c?.getRandomValues) {
    const limit = Math.floor(0x100000000 / bound) * bound;
    const buf = new Uint32Array(1);
    for (let i = 0; i < 64; i += 1) {
      c.getRandomValues(buf);
      if (buf[0] < limit) return buf[0] % bound;
    }
    return buf[0] % bound;
  }
  return Math.floor(Math.random() * bound);
};

/** Ten digits. */
export const ORDER_NUMBER_PATTERN = /^\d{10}$/;

/**
  Mint an order reference: a three-digit day bucket followed by seven random
  digits, e.g. "2124815093".

  There is no server to allocate from, so uniqueness is bought two ways. The
  day prefix means two orders can only ever collide if they were placed on the
  same UTC day, and within that day there are ten million slots. The `issued`
  ledger then makes reuse impossible within a browser, which is where it would
  otherwise actually happen: repeat customers.
*/
export const mintOrderNumber = (issued: readonly string[] = []): string => {
  const days = Math.floor((Date.now() - NUMBER_EPOCH) / 86_400_000);
  /* Guard a skewed clock: a device set before the epoch yields a negative day. */
  const prefix = String(((days % 1000) + 1000) % 1000).padStart(3, '0');

  let candidate = '';
  for (let attempt = 0; attempt < 16; attempt += 1) {
    candidate = prefix + String(randomBelow(10_000_000)).padStart(7, '0');
    if (!issued.includes(candidate)) return candidate;
  }
  /* Sixteen collisions against this browser's own ledger is not reachable in
     practice; return the last draw rather than looping forever. */
  return candidate;
};

/** References this browser has already handed out. Never throws: storage may be blocked. */
export const readIssued = (): string[] => {
  try {
    const raw = globalThis.localStorage?.getItem(ISSUED_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n): n is string => typeof n === 'string' && ORDER_NUMBER_PATTERN.test(n))
      : [];
  } catch {
    return [];
  }
};

/** Record a reference as spent, oldest entries dropped once the ledger is full. */
export const rememberIssued = (number: string) => {
  try {
    const next = [...readIssued().filter((n) => n !== number), number].slice(-ISSUED_MAX);
    globalThis.localStorage?.setItem(ISSUED_KEY, JSON.stringify(next));
  } catch {
    /* Private mode. The day prefix and the ten-million-slot draw still stand. */
  }
};

/** Mint and record in one step. Every caller wants both. */
export const issueOrderNumber = (): string => {
  const number = mintOrderNumber(readIssued());
  rememberIssued(number);
  return number;
};

/* -------------------------------------------------------------------------- */
/* Reading and writing the order                                              */
/* -------------------------------------------------------------------------- */

/**
  Resolve the ?plan= value against the real package list. Anything missing or
  unrecognised falls back to the 12-month plan, which is the one flagged
  `popular` on the pricing cards.
*/
export const planFor = (id: string | null | undefined) =>
  packages.find((p) => p.id === id) ?? packages.find((p) => p.popular) ?? packages[0];

/** The customer's answers, straight off the form and not yet trusted. */
export interface OrderDraft {
  planId: string;
  fullName: string;
  email: string;
  /** Calling code digits, no plus, e.g. "44". */
  dial: string;
  /** National number as typed. */
  phone: string;
  /** ISO 3166-1 alpha-2 of the picked calling code. */
  phoneCountry: string;
  orderType: string;
  device: string;
  contact: string;
  notes: string;
}

/**
  Turn a draft into an Order, or null if any field fails.

  Everything derivable is derived here rather than carried across from the
  form: the price and plan label come from `packages`, the option labels from
  the lists above. The only values that survive from the customer are the ones
  only they can know, and those are cleaned.
*/
export const buildOrder = (draft: OrderDraft, number: string): Order | null => {
  if (!ORDER_NUMBER_PATTERN.test(number)) return null;

  const plan = packages.find((p) => p.id === draft.planId);
  if (!plan) return null;

  const fullName = clean(draft.fullName, FIELD_LIMITS.fullName);
  const email = clean(draft.email, FIELD_LIMITS.email);
  const phone = clean(draft.phone, FIELD_LIMITS.phone);
  if (!isValidName(fullName) || !isValidEmail(email) || !isValidPhone(phone)) return null;

  if (!isOrderType(draft.orderType) || !isDevice(draft.device) || !isContact(draft.contact)) {
    return null;
  }

  const dial = nationalDigits(draft.dial) || '44';
  const digits = nationalDigits(phone);
  const phoneCountry = /^[A-Za-z]{2}$/.test(draft.phoneCountry)
    ? draft.phoneCountry.toUpperCase()
    : '';

  return {
    v: 1,
    number,
    planId: plan.id,
    planLabel: plan.label,
    price: plan.price,
    fullName,
    email,
    phone: `+${dial} ${phone}`.trim(),
    phoneE164: `+${dial}${digits}`,
    phoneCountry,
    orderType: draft.orderType,
    orderTypeLabel: orderTypeLabel(draft.orderType),
    device: draft.device,
    deviceLabel: deviceLabel(draft.device),
    contact: draft.contact,
    contactLabel: contactLabel(draft.contact),
    notes: clean(draft.notes, FIELD_LIMITS.notes),
    createdAt: Date.now(),
  };
};

/**
  Validate an order-shaped value from anywhere untrusted.

  In the browser that is sessionStorage, which belongs to the customer, not to
  us. Anything that fails returns null and the thank-you page falls back to its
  generic wording rather than rendering a record it cannot vouch for.

  The price is looked up from `planId` against `packages` on every read, so
  editing it in devtools changes nothing that is displayed or sent to support.
*/
export const validateOrder = (data: unknown): Order | null => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const o = data as Record<string, unknown>;
  if (o.v !== 1) return null;
  if (typeof o.number !== 'string' || !ORDER_NUMBER_PATTERN.test(o.number)) return null;

  const plan = packages.find((p) => p.id === o.planId);
  if (!plan) return null;

  const fullName = clean(o.fullName, FIELD_LIMITS.fullName);
  const email = clean(o.email, FIELD_LIMITS.email);
  if (!isValidName(fullName) || !isValidEmail(email)) return null;

  if (!isOrderType(o.orderType) || !isDevice(o.device) || !isContact(o.contact)) return null;

  const phone = clean(o.phone, FIELD_LIMITS.phone + 6);
  const phoneE164 =
    typeof o.phoneE164 === 'string' && /^\+\d{7,15}$/.test(o.phoneE164) ? o.phoneE164 : '';
  if (!phoneE164 || !isValidPhone(phone)) return null;

  /* A clock-skewed or hand-edited timestamp would render as NaN, so anything
     not finite is treated as "just now". */
  const createdAt =
    typeof o.createdAt === 'number' && Number.isFinite(o.createdAt) && o.createdAt > 0
      ? o.createdAt
      : Date.now();

  return {
    v: 1,
    number: o.number,
    planId: plan.id,
    planLabel: plan.label,
    price: plan.price,
    fullName,
    email,
    phone,
    phoneE164,
    phoneCountry:
      typeof o.phoneCountry === 'string' && /^[A-Za-z]{2}$/.test(o.phoneCountry)
        ? o.phoneCountry.toUpperCase()
        : '',
    orderType: o.orderType,
    orderTypeLabel: orderTypeLabel(o.orderType),
    device: o.device,
    deviceLabel: deviceLabel(o.device),
    contact: o.contact,
    contactLabel: contactLabel(o.contact),
    notes: clean(o.notes, FIELD_LIMITS.notes),
    createdAt,
  };
};

/** `validateOrder` over a JSON string. Bad JSON is just another failed record. */
export const parseOrder = (raw: string | null | undefined): Order | null => {
  if (!raw) return null;
  try {
    return validateOrder(JSON.parse(raw));
  } catch {
    return null;
  }
};

/** Read the current order straight from sessionStorage. Never throws. */
export const loadOrder = (): Order | null => {
  try {
    return parseOrder(globalThis.sessionStorage?.getItem(ORDER_KEY));
  } catch {
    return null;
  }
};

/** Persist an order. Returns false when storage is blocked, so the caller can say so. */
export const saveOrder = (order: Order): boolean => {
  try {
    globalThis.sessionStorage?.setItem(ORDER_KEY, JSON.stringify(order));
    return true;
  } catch {
    return false;
  }
};

export const clearOrder = () => {
  try {
    globalThis.sessionStorage?.removeItem(ORDER_KEY);
  } catch {
    /* Nothing to clear if storage was never available. */
  }
};

/**
  Fire-and-forget ping to ORDER_WEBHOOK. It must never block navigation or
  surface an error to the customer: if the relay is down, the order still
  stands and the customer has still been told what happens next.

  `keepalive` is what lets it survive the navigation to the thank-you page that
  happens on the very next line of the submit handler.
*/
export const pingWebhook = (event: 'order_placed', order: Order) => {
  try {
    void fetch(ORDER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, order }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* no-op */
  }
};

/**
  The message the customer's WhatsApp opens with from the thank-you page, and
  the one the fallback "order on WhatsApp instead" link uses. Everything in it
  is derived from the validated order, never from raw storage.
*/
export const orderSummaryMessage = (order: Order) =>
  [
    `Hello, I have just placed order #${order.number} on ukiptvbox.com.`,
    `Plan: ${order.planLabel} (£${order.price.toFixed(2)})`,
    `Name: ${order.fullName}`,
    `Device: ${order.deviceLabel}`,
    `Order type: ${order.orderTypeLabel}`,
  ].join('\n');

/** Every checkout route, for the sitemap's exclude list. Keep in sync with the pages. */
export const checkoutRoutes = ['/checkout/', '/checkout/confirmed/'] as const;
