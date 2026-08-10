import type { APIRoute } from 'astro';
import { posts } from '../data/posts';
import { checkoutRoutes } from '../data/checkout';

const SITE = 'https://ukiptvbox.com';

/**
 * Generated from the actual page files so the sitemap can never drift out of
 * sync with the build. The previous hand-maintained public/sitemap.xml listed
 * `/pricing` without a trailing slash, which 308-redirects to `/pricing/` and
 * showed up in Search Console as "Page with redirect".
 */
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

/**
 * Pages that must never be advertised to search engines. The checkout funnel is
 * noindex on the pages themselves; listing it here keeps the sitemap from
 * contradicting that.
 */
const EXCLUDE = new Set(['/404/', ...checkoutRoutes]);

function toRoute(file: string): string | null {
  // Dynamic routes are resolved by their static counterparts; skip the template.
  if (file.includes('[')) return null;

  let p = file.replace(/^\.\//, '').replace(/\.astro$/, '');
  if (p === 'index') return '/';
  p = p.replace(/\/index$/, '');
  return `/${p}/`;
}

const lastmodByRoute = new Map(
  posts.map((p) => [`/blog/${p.slug}/`, p.updated || p.published] as const)
);

export const GET: APIRoute = () => {
  const routes = Array.from(
    new Set(pageFiles.map(toRoute).filter((r): r is string => r !== null))
  )
    .filter((r) => !EXCLUDE.has(r))
    .sort((a, b) => a.localeCompare(b));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const lastmod = lastmodByRoute.get(r);
    return `  <url>\n    <loc>${SITE}${r}</loc>${
      lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
    }\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
