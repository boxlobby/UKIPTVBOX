# ukiptvbox.com

Landing page for **UKIPTVBOX** — UK IPTV subscription with 4 plans (1, 3, 6 and 12 months) from £14.99.

Static site built with **Astro 4 + Tailwind CSS**, hosted on **Cloudflare Pages**.

## Local development

Requires Node 20+ (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
├── components/    UI components (Header, Hero, PricingCard, etc.)
├── data/          Content in TS files — edit copy here, not in components
├── layouts/       BaseLayout.astro handles SEO head + JSON-LD
├── pages/         index.astro (landing) + stubs (blog, order, policies)
└── styles/        global.css (Tailwind + brand tokens)
public/
├── _headers       Cloudflare Pages security & cache headers
├── _redirects     www → apex redirect
├── robots.txt     allows all, points to sitemap
├── favicon.svg    brand mark
└── og-image.svg   social share image
```

## Before you ship

1. In `src/data/site.ts`, replace:
   - `whatsapp` — real WhatsApp Business number (digits only, no `+`).
   - `supportEmail` — already set to `support@ukiptvbox.com`, confirm it's live.
   - `reviews.count` / `reviews.rating` — keep honest.
   - `packages` — update prices if needed.
2. Rasterise `public/og-image.svg` → `public/og-image.png` (1200×630) for Twitter/X compatibility, then update `BaseLayout.astro` to point at `.png`.
3. Generate `public/apple-touch-icon.png` (180×180) from the favicon.
4. Review all copy in `src/data/*.ts`.

## Deploy to Cloudflare Pages

### One-off setup

1. Push this repo to GitHub (private):
   ```bash
   gh repo create iptvtrial --private --source . --remote origin --push
   ```
2. In Cloudflare dashboard → **Pages → Create a project → Connect to Git** → select `iptvtrial`.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20`
4. Environment variables: none required.
5. **Custom domains** → add `iptvtrial.org` and `www.iptvtrial.org`. The `_redirects` file forces `www` → apex.
6. **Analytics** → enable Cloudflare Web Analytics for `iptvtrial.org` (cookieless, no consent banner needed).

### Every push after that

- `git push origin main` → Cloudflare auto-deploys production.
- `git push origin dev` → auto preview URL.
- Pull requests get their own preview URL.

## Post-launch SEO checklist

- [ ] Submit `https://iptvtrial.org/sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**.
- [ ] Verify structured data with Google’s **Rich Results Test** (Product, Offer, FAQPage, Organization).
- [ ] Run **Lighthouse** (mobile) — target ≥95 Performance, 100 SEO.
- [ ] Test on real Firestick / Smart TV / iOS to confirm the WhatsApp CTA works.
- [ ] Confirm HTTPS + www→apex redirect with `curl -I https://www.iptvtrial.org`.

## Next milestones

- `/order` — real card checkout (Stripe / crypto)
- `/blog` — MDX blog with Article schema
- `/privacy`, `/terms`, `/refund` — full policy content
- Live-chat widget
