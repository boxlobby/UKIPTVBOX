export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  published: string;
  updated: string;
  readMinutes: number;
  author: string;
  keywords: string[];
}

export const posts: BlogPost[] = [
  {
    slug: 'iptv-firestick-uk',
    // Title tag renders as "<title> | UK IPTV BOX" = 55 chars (target 50–60).
    title: 'IPTV Firestick UK: Setup, Speed and Fixes',
    // Meta description: 154 chars (target 150–160).
    excerpt:
      'IPTV Firestick setup in under 15 minutes. Which Fire Stick to buy, the broadband speed you actually need, buffering fixes and where UK law draws the line.',
    category: 'Setup Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Streaming_stick_plugged_into_TV_202607270132.jpeg',
    imageAlt: 'IPTV Firestick UK setup with a Fire TV Stick plugged into a living room television playing live channels',
    published: '2026-07-26',
    updated: '2026-07-26',
    readMinutes: 12,
    author: 'James Whitfield',
    keywords: [
      'iptv firestick',
      'fire stick iptv',
      'best iptv firestick',
      'best iptv for firestick',
      'iptv on firestick',
      'best iptv app firestick',
    ],
  },
  {
    slug: 'best-iptv-provider-uk',
    // Title tag renders as "<title> | UK IPTV BOX" = 56 chars (target 50–60).
    title: 'Best IPTV Provider UK: An Honest Scorecard',
    // Meta description: 157 chars (target 150–160).
    excerpt:
      'The best IPTV provider UK checklist: uptime, support speed, refund windows and connection limits, measured honestly against our own service, losses included.',
    category: 'Buying Guide',
    // The %E2%80%A6 is a literal ellipsis in the R2 object name. Leave it encoded.
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Streaming_providers_assessment_p%E2%80%A6_202607270127.jpeg',
    imageAlt: 'Best IPTV provider UK scorecard showing uptime, support response time and refund window compared',
    published: '2026-07-22',
    updated: '2026-07-22',
    readMinutes: 12,
    author: 'James Whitfield',
    keywords: [
      'best iptv provider uk',
      'best uk iptv',
      'best iptv in uk',
      'best iptv providers uk',
      'best iptv service uk',
      'iptv uk best',
    ],
  },
  {
    slug: 'internet-protocol-television',
    // Title tag renders as "<title> | UK IPTV BOX" = 58 chars (target 50–60).
    title: 'IPTV Explained: How Internet Protocol TV Works',
    // Meta description: 154 chars (target 150–160).
    excerpt:
      'Internet Protocol Television explained. How IPTV works, how packets carry a channel to your telly, unicast vs multicast, and the broadband speed you need.',
    category: 'Explainer',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Television_travels_over_internet_202607270121.jpeg',
    imageAlt: 'Internet Protocol Television diagram showing a TV feed sent as IP packets to a living room television',
    published: '2026-07-20',
    updated: '2026-07-20',
    readMinutes: 10,
    author: 'James Whitfield',
    keywords: [
      'internet protocol television',
      'what is iptv',
      'how does iptv work',
      'iptv meaning',
      'ip television playlist',
      'iptv server',
    ],
  },
  {
    slug: 'iptv-uk',
    // Title tag renders as "<title> | UK IPTV BOX" = 53 chars (target 50–60).
    title: 'IPTV UK 2026: Costs, Legality and Setup',
    // Meta description: 153 chars (target 150–160).
    excerpt:
      'IPTV UK explained. What a UK IPTV subscription really costs, where the legal line sits, the broadband speed you need, and Fire Stick setup in 15 minutes.',
    category: 'Buying Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Television_over_broadband_guide_202607270102.jpeg',
    imageAlt: 'IPTV UK setup on a living room television streaming live channels over home broadband',
    published: '2026-07-24',
    updated: '2026-07-24',
    readMinutes: 13,
    author: 'James Whitfield',
    keywords: [
      'iptv uk',
      'uk iptv',
      'iptv in uk',
      'iptv united kingdom',
      'iptv uk providers',
      'british iptv',
    ],
  },
  {
    slug: 'iptv-free-trial-uk',
    title: 'IPTV Free Trial UK: What to Test Before Paying',
    excerpt:
      'The honest guide to an IPTV free trial UK: what to test, red flags to avoid, and why a genuine 30-day IPTV trial beats a "free" 24-hour link every time.',
    category: 'Trial Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/IPTV_Free_Trial_UK_stopwatch_202607201536.webp',
    imageAlt: 'IPTV Free Trial UK stopwatch showing what a legitimate 30-day UKIPTVBOX test looks like',
    published: '2026-07-14',
    updated: '2026-07-22',
    readMinutes: 10,
    author: 'James Whitfield',
    keywords: [
      'free trial iptv uk',
      'iptv free trial uk',
      'iptv trial',
      'iptv uk trial',
      'iptv subscription uk',
      'iptv trial 24 hours',
      'iptvuk free trial',
      'iptv test',
      'best iptv uk',
    ],
  },
  {
    slug: 'is-iptv-legal-uk',
    title: 'Is IPTV Legal in the UK? A 2026 Guide',
    excerpt:
      'A clear guide to IPTV legality in the UK: what is legal, what isn\'t, what Ofcom actually says, and how to pick an IPTV provider that keeps you safe.',
    category: 'Legal',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/IPTV_legal_UK_explainer_202607201513.webp',
    imageAlt: 'Is IPTV legal in the UK 2026 plain-English guide for UKIPTVBOX subscribers',
    published: '2026-07-07',
    updated: '2026-07-22',
    readMinutes: 9,
    author: 'James Whitfield',
    keywords: [
      'is iptv legal uk',
      'iptv legal uk',
      'iptv law uk',
      'iptv uk',
      'iptv subscription uk',
      'legal iptv uk',
      'ofcom iptv',
    ],
  },
  {
    slug: 'iptv-subscription-uk-buyers-guide',
    title: 'IPTV Subscription UK: 2026 Buyer\'s Guide',
    excerpt:
      'UK buyer\'s guide to choosing an IPTV subscription in 2026: server uptime, EPG quality, catch-up, trial length, payment safety and what to ask before you pay.',
    category: 'Buying Guide',
    image: "https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/IPTV_Subscription_UK_Buyer's_Guide_202607201538.webp",
    imageAlt: 'IPTV Subscription UK 2026 buyer guide: choosing the best UK IPTV subscription with UKIPTVBOX',
    published: '2026-06-30',
    updated: '2026-07-22',
    readMinutes: 12,
    author: 'James Whitfield',
    keywords: [
      'iptv subscription uk',
      'uk iptv subscription',
      'iptv providers uk',
      'best iptv uk',
      'iptv uk',
      'buy iptv',
      'iptv subscribe',
      'iptv suppliers',
    ],
  },
  {
    slug: 'cheap-iptv-uk-scam-or-legit',
    title: 'Cheap IPTV UK: Scam or Legit? Red Flags',
    excerpt:
      'Cheap IPTV UK is littered with £5 lifetime scams. Spot the red flags, find genuine value, and see why a monitored 30-day IPTV trial is the safer choice.',
    category: 'Buying Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Shield_icon_vs_warning_sign_202607201558.webp',
    imageAlt: 'Cheap IPTV UK shield vs warning sign: how to spot genuine value vs scams with UKIPTVBOX',
    published: '2026-06-23',
    updated: '2026-07-22',
    readMinutes: 10,
    author: 'James Whitfield',
    keywords: [
      'cheap iptv',
      'cheap iptv uk',
      'iptv suppliers',
      'buy iptv',
      'iptv scam uk',
      'iptv subscription uk',
      'iptv uk',
      'iptv trial',
    ],
  },
  {
    slug: 'iptv-smarters-pro-firestick-uk',
    title: 'IPTV Smarters Pro Firestick UK Setup Guide',
    excerpt:
      'UK guide to installing IPTV Smarters Pro on Firestick: sideload with Downloader, Xtream Codes / M3U login, EPG setup and fixes for the most common errors.',
    category: 'Setup Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/Firestick_IPTV_Smarters_Pro_setu%E2%80%A6_202607201949%20(1).webp',
    imageAlt: 'IPTV Smarters Pro on Firestick full UK install guide for UKIPTVBOX subscribers in 2026',
    published: '2026-06-16',
    updated: '2026-07-22',
    readMinutes: 11,
    author: 'James Whitfield',
    keywords: [
      'iptv smarters pro firestick',
      'iptv smarters firestick',
      'how to install iptv smarters pro on firestick',
      'iptv smarters pro download',
      'iptv smarters pro apk',
      'iptv smarters downloader code',
      'iptv smarters pro subscription',
      'iptv on firestick',
    ],
  },
  {
    slug: 'best-iptv-player-apps-2026-uk',
    title: 'Best IPTV Player Apps UK 2026: Top Picks',
    excerpt:
      'Best IPTV player apps for UK viewers in 2026, ranked by EPG quality, catch-up and multi-view. Compare Smarters Pro, TiviMate and OTT Navigator side by side.',
    category: 'App Reviews',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/IPTV_player_apps_comparison_202607201951%20(1).webp',
    imageAlt: 'Best IPTV player apps UK 2026 comparison: Smarters, TiviMate and OTT Navigator for UKIPTVBOX',
    published: '2026-06-09',
    updated: '2026-07-22',
    readMinutes: 12,
    author: 'James Whitfield',
    keywords: [
      'best iptv player',
      'best iptv app',
      'iptv players',
      'iptv smarters player',
      'best iptv player for windows',
      'iptv smart',
      'iptv pro',
      'iptv smarters pro',
    ],
  },
  {
    slug: 'top-5-iptv-boxes-uk-2026',
    title: 'Top 5 IPTV Boxes UK 2026: Ranked & Tested',
    excerpt:
      'The five best IPTV boxes to buy in the UK for 2026, ranked on 4K playback, app support, EPG quality and value. Formuler Z11 Pro Max, Nvidia Shield and more.',
    category: 'Buying Guide',
    image: 'https://pub-a911d0797db04b879a41ba8f0cdf2db6.r2.dev/IPTV_boxes_ranked_and_tested_202607201510.webp',
    imageAlt: 'Top 5 IPTV boxes UK 2026 ranked and tested: best UK IPTV hardware for UKIPTVBOX',
    published: '2026-07-19',
    updated: '2026-07-22',
    readMinutes: 12,
    author: 'James Whitfield',
    keywords: [
      'iptv box uk',
      'iptv uk',
      'iptv trial',
      'iptv uk trial',
      'formuler tv box',
      'best iptv',
      'iptv subscription uk',
      'iptv box 2026',
      'android tv box uk',
      '4k iptv box',
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
