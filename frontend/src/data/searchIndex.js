// Site search index.
//
// Built in memory from the same data the pages render, so a result can never
// point at something that is not on the site. There is no backend involved: the
// whole corpus is a few dozen short records, which is far too small to justify a
// network round trip or a search dependency.

import { MENU_CATEGORIES, BUNDLES, SYNONYMS } from './menu';

// Pages worth returning in their own right. Kept deliberately short: a search
// result that is just "here is a page that mentions your word" is noise.
const PAGES = [
  { title: 'Menu', path: '/menu', body: 'Full menu of wraps, rice meals, soups and swallow, sides and bundles. Order Nigerian food in Stirling for collection or local delivery.' },
  { title: 'Catering and Events', path: '/reservation', body: 'Book HoneySpice to cater weddings, birthdays, parties, corporate events and celebrations across the UK. Custom menus built around your guest numbers and budget.' },
  { title: 'About HoneySpice', path: '/about', body: 'HoneySpice Cuisine started in Ibadan, Nigeria, in 2019, founded by chef Lois Smart. Our story, mission and vision.' },
  { title: 'Gallery', path: '/gallery', body: 'Photographs of our Nigerian dishes, including jollof rice, egusi, efo riro, ofada and boli.' },
  { title: 'Find Us', path: '/location', body: 'HoneySpice Cuisine, 34 Woodside Road, Stirling FK8 1PS. Directions and opening information.' },
  { title: 'Contact', path: '/contact', body: 'Contact HoneySpice for orders, catering and general enquiries. Phone, email and message form.' },
  { title: 'Get Meal Suggestions', path: '/ai-assistant', body: 'Tell us your budget, group size and occasion and we suggest a Nigerian spread to match.' },
  { title: 'Plan a Picnic', path: '/plan-picnic', body: 'Bundles for picnics and feeding a crowd, sized to your group and budget.' },
];

// Flatten everything into one shape so ranking does not need to special-case.
function buildIndex() {
  const records = [];

  MENU_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      records.push({
        kind: 'dish',
        title: item.name,
        subtitle: item.description,
        category: cat.title,
        price: item.price,
        image: item.image,
        // Deep link straight to the right menu tab rather than dumping the
        // reader at the top of a four-category page.
        path: `/menu?category=${cat.id}`,
        keywords: SYNONYMS[item.name] || [],
      });
    });
  });

  BUNDLES.forEach((b) => {
    records.push({
      kind: 'bundle',
      title: b.name,
      subtitle: `${b.desc} ${b.items.join('. ')}`,
      category: 'Bundles',
      price: b.price,
      image: b.image,
      path: '/menu?category=bundles',
      keywords: [b.tag, 'bundle', 'pack', 'group', 'party'],
    });
  });

  PAGES.forEach((p) => {
    records.push({ kind: 'page', title: p.title, subtitle: p.body, category: 'Pages', path: p.path, keywords: [] });
  });

  return records;
}

export const INDEX = buildIndex();

const normalise = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Score a record against the query terms. Every term must match something,
// so "beef soup" does not return every dish containing "beef" alone. Field
// weighting means a title hit outranks a description hit rather than the two
// being treated as equally relevant.
function scoreRecord(record, terms, requireAll) {
  const title = normalise(record.title);
  const subtitle = normalise(record.subtitle);
  const category = normalise(record.category);
  const keywords = normalise(record.keywords.join(' '));

  let total = 0;
  let matched = 0;
  for (const term of terms) {
    let best = 0;
    if (title === term) best = 100;
    else if (title.startsWith(term)) best = 70;
    else if (title.includes(term)) best = 55;
    else if (keywords.includes(term)) best = 40;
    else if (category.includes(term)) best = 25;
    else if (subtitle.includes(term)) best = 15;

    if (best === 0 && requireAll) return 0;
    if (best > 0) matched += 1;
    total += best;
  }
  if (matched === 0) return 0;

  // Dishes are what people are usually looking for on a restaurant site, so a
  // dish edges out a page of equal textual relevance.
  if (record.kind === 'dish') total += 6;
  if (record.kind === 'bundle') total += 3;
  return total;
}

function run(terms, requireAll, limit) {
  return INDEX.map((record) => ({ record, score: scoreRecord(record, terms, requireAll) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((r) => r.record);
}

// Returns { results, exact }. Requiring every term keeps precision, so "beef
// wrap" does not return every soup. But a strict AND on a corpus this small
// dead-ends easily: "beef soup" matched nothing at all, because we sell beef and
// we sell soup but not a beef soup. When that happens, fall back to matching any
// term and let the caller say the results are related rather than exact.
export function search(query, { limit = 30 } = {}) {
  const q = normalise(query);
  if (q.length < 2) return { results: [], exact: true };
  const terms = q.split(' ').filter(Boolean);

  const strict = run(terms, true, limit);
  if (strict.length > 0 || terms.length === 1) return { results: strict, exact: true };

  return { results: run(terms, false, limit), exact: false };
}
