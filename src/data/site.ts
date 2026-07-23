export const site = {
  name: 'UK IPTV BOX',
  domain: 'ukiptvbox.com',
  url: 'https://ukiptvbox.com',
  tagline: "The UK's best IPTV subscription: 50,000+ channels from £14.99",
  price: 14.99,
  currency: 'GBP',
  currencySymbol: '£',
  whatsapp: '447441346459',
  supportEmail: 'support@ukiptvbox.com',
  reviews: {
    rating: 4.9,
    count: 312,
  },
} as const;

export const packages = [
  {
    id: 'monthly',
    label: '1 Month',
    months: 1,
    price: 14.99,
    perMonth: 14.99,
    save: null,
    popular: false,
    badge: null,
  },
  {
    id: 'quarterly',
    label: '3 Months',
    months: 3,
    price: 26.99,
    perMonth: 9.00,
    save: 17.98,
    popular: false,
    badge: null,
  },
  {
    id: 'biannual',
    label: '6 Months',
    months: 6,
    price: 36.99,
    perMonth: 6.17,
    save: 52.95,
    popular: false,
    badge: null,
  },
  {
    id: 'annual',
    label: '12 Months',
    months: 12,
    price: 49.99,
    perMonth: 4.17,
    save: 129.89,
    popular: true,
    badge: 'Best Value',
  },
] as const;

export const waLink = (msg = 'Hello, I would like to subscribe to UK IPTV BOX.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const waLinkPackage = (pkg: { label: string; price: number }) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello, I would like the ${pkg.label} UK IPTV BOX subscription (£${pkg.price}).`)}`;
