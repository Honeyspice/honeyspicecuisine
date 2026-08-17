// Single source of truth for the public, indexable routes.
//
// Both the per-route HTML generator and sitemap.xml are built from this list,
// so a canonical URL can never disagree with the sitemap that advertises it.
// Plain CommonJS because scripts/seo-build.js runs in Node after the webpack
// build, where there is no module bundler to lean on.
//
// Adding a route here puts it in the sitemap AND gives it its own static head
// tags. Do not add a route that is transactional, behind authentication, or
// thin: see the exclusions recorded at the bottom of this file.

const SITE_ORIGIN = 'https://honeyspicecuisine.co.uk';

// The share card is a brand asset, the lockup on charcoal, rather than a food
// photograph. Absolute because crawlers reject relative og:image paths.
const OG_IMAGE = `${SITE_ORIGIN}/images/og-honeyspice.png`;

// Titles and descriptions are the ones the pages already set at runtime via the
// Seo component, hoisted verbatim so the static head and the rendered head agree.
const ROUTES = [
  {
    path: '/',
    title: 'HoneySpice Cuisine | Nigerian Food & Catering UK',
    description:
      'Authentic Nigerian food in Stirling. Order for collection or delivery, or book HoneySpice to cater weddings, parties and events across the UK.',
  },
  {
    path: '/menu',
    title: 'Menu | HoneySpice Cuisine Stirling',
    description:
      'Explore the full HoneySpice Kitchen menu: wraps, rice meals, soups and swallow, sides and curated bundles. Authentic Nigerian food in Stirling, UK.',
  },
  {
    path: '/reservation',
    title: 'Book Catering & Events | HoneySpice Cuisine',
    description:
      'Book HoneySpice Cuisine for your event, wedding, or corporate catering in Stirling. Authentic Nigerian food for any occasion.',
  },
  {
    path: '/gallery',
    title: 'Gallery | HoneySpice Cuisine',
    description:
      'Browse our gallery of authentic Nigerian dishes: Jollof Rice, Egusi, Amala, Efo Riro and more from HoneySpice Cuisine in Stirling.',
  },
  {
    path: '/about',
    title: 'About Us | HoneySpice Cuisine',
    description:
      'HoneySpice began in Ibadan in 2019 and now serves Nigerian food in Stirling, with catering across the UK. Founded by certified chef Lois Smart.',
  },
  {
    path: '/location',
    title: 'Find Us | HoneySpice Cuisine Stirling',
    description:
      'Find HoneySpice Cuisine in Stirling, UK at 34 Woodside Road, FK8 1PS. View our location and get directions.',
  },
  {
    path: '/contact',
    title: 'Contact | HoneySpice Cuisine',
    description:
      'Contact HoneySpice Cuisine in Stirling, UK for Nigerian food orders, catering, and general enquiries.',
  },
];

// Deliberately excluded, and why:
//   /cart /checkout /checkout/success /checkout/cancel   transactional
//   /login /register                                     authentication
//   /dashboard /meal-plan /profile-setup                 removed, now redirects
//   /order                                               an 18-line stub
//   /ai-assistant /plan-picnic                           tools, no stable content
//   /why-us /recipe-manual                               thin, and set no page title

// Absolute canonical URL for a route. Trailing slash on the homepage only, so
// /menu and /menu/ cannot both present themselves as canonical.
function canonicalFor(path) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path.replace(/\/+$/, '')}`;
}

module.exports = { SITE_ORIGIN, OG_IMAGE, ROUTES, canonicalFor };
