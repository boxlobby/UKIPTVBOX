/*
  POST /api/order — relays confirmed checkout orders to Telegram.

  A Cloudflare Pages Function, so it runs at the edge alongside the static build
  with no server to keep alive.

  This posts into the same Telegram chat as bestiptvbox.ca, so every message
  opens with the site it came from — see `SITE_TAG` below. If you ever point a
  third site at the same chat, give it its own tag rather than letting two
  sites share one.

  The security posture is the whole design. This endpoint is unauthenticated
  and world-writable — it has to be, because it is called from a static page
  with no session — so it treats every request as hostile:

    - Only same-origin POSTs are entertained.
    - The body is capped before it is read, let alone parsed.
    - The order runs through `validateOrder`, the same function the browser
      uses, which re-derives the price from the plan catalogue. Someone posting
      a hand-written £1 order for the annual plan gets a message that says
      £49.99, because the price never comes from the request.
    - Everything interpolated into the message is HTML-escaped.
    - With a KV namespace bound, requests are rate limited per IP and order
      numbers are checked for reuse, which is the cross-browser half of the
      uniqueness guarantee the browser ledger cannot make on its own.

  Required Pages environment variables (set them as encrypted secrets in the
  dashboard, never in this repo). Reuse the same two values as bestiptvbox.ca:

    TELEGRAM_BOT_TOKEN   from @BotFather
    TELEGRAM_CHAT_ID     the chat, channel or group to post into

  Optional binding:

    ORDERS               a KV namespace. Without it the endpoint still works,
                         it just cannot dedupe or rate limit.
*/
import { validateOrder, type Order } from '../../src/data/checkout';
import { site } from '../../src/data/site';

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ORDERS?: KVNamespace;
}

/**
  There is no payment step on this site, so there is exactly one event: the
  customer confirmed their details and is now waiting to hear from us.
*/
type CheckoutEvent = 'order_placed';

/** Bodies are a few hundred bytes. Anything larger is not a checkout. */
const MAX_BODY_BYTES = 4096;

/** Per-IP ceiling. A real customer fires this once. */
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60_000;

/** How long a number stays claimed. Comfortably past any reconciliation. */
const NUMBER_TTL_SECONDS = 60 * 60 * 24 * 45;

/* -------------------------------------------------------------------------- */

/**
  Telegram's HTML parse mode. `clean` already strips angle brackets from every
  free-text field, so this is the second layer rather than the only one — and
  it is the only thing handling `&`, which `clean` deliberately leaves alone
  because it is legitimate in a name.
*/
const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const money = (n: number) => `£${n.toFixed(2)}`;

/** UK time: where the business is, and what support reads the clock in. */
const stamp = (ms: number) =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(new Date(ms));

/**
  First line of every message. The Telegram chat is shared with bestiptvbox.ca,
  so support has to be able to tell at a glance which site an order came from
  without reading the plan prices to work it out.
*/
const SITE_TAG = `🇬🇧 <b>${esc(site.domain.toUpperCase())}</b>`;

const message = (order: Order, warning: string | null) => {
  const wa = `https://wa.me/${order.phoneE164.replace(/\D/g, '')}`;

  const head = [
    SITE_TAG,
    `🧾 <b>New order</b> <code>${esc(order.number)}</code>`,
    `${esc(order.planLabel)} — <b>${money(order.price)}</b>`,
  ].join('\n');

  const body = [
    '',
    `<b>${esc(order.fullName)}</b>`,
    `✉️ ${esc(order.email)}`,
    `📱 <a href="${wa}">${esc(order.phone)}</a>`,
    `💬 Prefers <b>${esc(order.contactLabel)}</b>`,
    `🛠 ${esc(order.deviceLabel)} · ${esc(order.orderTypeLabel)}`,
    `🕒 ${esc(stamp(order.createdAt))}`,
  ];

  /* Only when they actually wrote something. An empty "Notes:" line is noise
     on every single order. */
  if (order.notes) body.push(`📝 ${esc(order.notes)}`);

  /* Nobody has paid yet — the whole point of this funnel is that a human
     follows up. Say so, so the message reads as a to-do and not a receipt. */
  body.push('', '⏳ <b>Not paid yet</b> — contact within 10–30 min to take payment.');

  /* Support has to see a duplicated number immediately, above the details,
     because acting on the wrong one is the failure this guards against. */
  return (warning ? `⚠️ <b>${esc(warning)}</b>\n\n` : '') + head + body.join('\n');
};

/* -------------------------------------------------------------------------- */

const clientIp = (request: Request) =>
  request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? 'unknown';

/**
  Approximate per-IP throttle.

  KV is eventually consistent and read-then-write races, so two requests in the
  same instant can both see the same count. That is fine: this exists to stop
  someone pointing a loop at the endpoint and filling the Telegram channel, not
  to enforce an exact quota. For a hard limit, add a Cloudflare rate-limiting
  rule in front of the route.
*/
const overRateLimit = async (kv: KVNamespace, ip: string) => {
  const key = `rl:${ip}:${Math.floor(Date.now() / RATE_WINDOW_MS)}`;
  const seen = Number((await kv.get(key)) ?? '0');
  if (seen >= RATE_LIMIT) return true;
  await kv.put(key, String(seen + 1), { expirationTtl: 60 });
  return false;
};

/**
  Claim an order number, and say what happened.

  The browser's localStorage ledger guarantees one browser never reuses a
  number. It cannot see other browsers, so this is where a genuine cross-
  customer collision surfaces. Distinguishing the two cases matters:

    'fresh'     first time this number has been seen.
    'repeat'    same number, same customer — a double-submit or a page
                refresh. Not worth a second Telegram message.
    'collision' same number, different customer. Rare (ten million slots a
                day) but the one case where staying quiet would mean chasing
                the wrong person, so it is flagged loudly and still delivered.

  The key is namespaced per site so that the two sites sharing a Telegram chat
  do not also have to share a KV namespace's keyspace by accident.
*/
const claimNumber = async (
  kv: KVNamespace,
  event: CheckoutEvent,
  order: Order
): Promise<'fresh' | 'repeat' | 'collision'> => {
  const key = `${site.domain}:${event}:${order.number}`;
  const held = await kv.get(key);

  if (held === null) {
    await kv.put(key, order.email, { expirationTtl: NUMBER_TTL_SECONDS });
    return 'fresh';
  }
  return held === order.email ? 'repeat' : 'collision';
};

/* -------------------------------------------------------------------------- */

const send = async (env: Env, text: string) => {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    /* Never echo the response: a bad-token error from Telegram quotes the URL
       it was called with, token included. Log the status only. */
    console.error(`telegram sendMessage failed: ${res.status}`);
    return false;
  }
  return true;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const done = (status: number) => new Response(null, { status });

  /* Same-origin only. Not a CSRF defence in the session sense — there is no
     session to ride — but it turns a trivially scriptable endpoint into one
     that needs a request forged outside the browser. */
  if (request.headers.get('Origin') !== new URL(request.url).origin) return done(403);

  const declared = Number(request.headers.get('Content-Length') ?? '0');
  if (declared > MAX_BODY_BYTES) return done(413);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return done(413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return done(400);
  }
  if (!payload || typeof payload !== 'object') return done(400);

  const { event, order: candidate } = payload as { event?: unknown; order?: unknown };
  if (event !== 'order_placed') return done(400);

  /* The same validator the browser runs. Price, plan label and every option
     label are re-derived from the data files, so nothing about the money in
     this message came from the request. */
  const order = validateOrder(candidate);
  if (!order) return done(422);

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set');
    return done(503);
  }

  let warning: string | null = null;

  if (env.ORDERS) {
    if (await overRateLimit(env.ORDERS, clientIp(request))) return done(429);

    const claim = await claimNumber(env.ORDERS, event, order);
    /* Already told support about this exact order, from this exact customer. */
    if (claim === 'repeat') return done(204);
    if (claim === 'collision') {
      warning = `Order number ${order.number} was already used by a different customer — check both before acting on either.`;
    }
  }

  return done((await send(env, message(order, warning))) ? 202 : 502);
};
