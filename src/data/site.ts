export const site = {
  name: 'IPTV Trial',
  domain: 'iptvtrial.org',
  url: 'https://iptvtrial.org',
  tagline: "The UK's cheapest IPTV trial, 30 days for £14.99",
  price: 14.99,
  currency: 'GBP',
  currencySymbol: '£',
  trialDays: 30,
  whatsapp: '447441346459',
  supportEmail: 'support@iptvtrial.org',
  reviews: {
    rating: 4.9,
    count: 312,
  },
} as const;

export const waLink = (msg = 'Hello, I would like to start my £14.99 IPTV trial.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
