export const site = {
  name: 'IPTV Trial',
  domain: 'iptvtrial.org',
  url: 'https://iptvtrial.org',
  tagline: 'The UK’s cheapest IPTV trial — 30 days for £12.99',
  price: 12.99,
  currency: 'GBP',
  currencySymbol: '£',
  trialDays: 30,
  whatsapp: '447000000000', // TODO: replace with real WhatsApp business number (no +)
  supportEmail: 'support@iptvtrial.org',
  reviews: {
    rating: 4.9,
    count: 312,
  },
} as const;

export const waLink = (msg = 'Hi, I’d like to start my £12.99 IPTV trial.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
