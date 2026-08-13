import { site, waLink } from './site';

/**
 * A single author and publisher entity shared by every Article page.
 *
 * Five posts previously declared a full Person node while seven carried only an
 * inline `{ '@type': 'Person', name }` with no @id, so Google saw eight loosely
 * related authors instead of one. Both nodes are keyed by a stable @id, which
 * lets each Article reference them rather than restate them.
 */
export const orgId = `${site.url}/#organization`;

/** Resolves to the bio section on /about/, so the schema and the page agree. */
export const authorId = `${site.url}/about/#team`;

export const authorName = 'Mark Reynolds';

export const organizationNode = {
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  url: site.url,
  logo: { '@type': 'ImageObject', url: `${site.url}/og-image.svg` },
  sameAs: [`${site.url}/about/`],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'en-GB',
    url: waLink(),
  },
};

export const authorNode = {
  '@type': 'Person',
  '@id': authorId,
  name: authorName,
  url: authorId,
  jobTitle: 'Independent streaming and broadband consultant',
  description:
    'UK-based streaming and broadband consultant with six-plus years evaluating IPTV infrastructure, server stability and home network performance.',
  knowsAbout: ['IPTV', 'UK broadband', 'Home network troubleshooting', 'Streaming hardware'],
  worksFor: { '@id': orgId },
};

/** Reference form for use inside an Article's author/publisher fields. */
export const authorRef = { '@id': authorId };
export const publisherRef = { '@id': orgId };
