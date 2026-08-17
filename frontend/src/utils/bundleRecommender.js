// ─── Bundle definitions ───────────────────────────────────────────────────────
//
// Every bundle here previously included fries and drinks. Neither is on the
// menu: drinks were removed, and we do not sell fries. The assistant was
// therefore recommending spreads that could not be ordered. Contents are now
// drawn only from things the kitchen actually sells.
//
// NOTE: these duplicate the BUNDLES in src/data/menu.js, and the two disagree on
// group sizes. The Menu page advertises the Friends Pack as "For 4–6" and the
// Group Pack as "For 8–12", while the thresholds below switch at 3–5 and 6+.
// They should be reconciled against one definition.

export const BUNDLES = {
  couple: {
    id: 'couple',
    name: 'Couple Pack',
    price: 25,
    tag: 'For 2',
    image: '/images/ChickenShawarmaWrap.webp',
    items: ['2 × Chicken Shawarma Wrap', '1 × Coleslaw'],
    desc: 'A spread for two: two wraps and a shared side.',
  },
  friends: {
    id: 'friends',
    name: 'Friends Pack',
    price: 45,
    tag: 'For 3–5',
    image: '/images/ChickenShawarmaWrap.webp',
    items: ['4 × Chicken Shawarma Wrap', '1 × Large Jollof Rice', '1 × Coleslaw'],
    desc: 'A crowd-pleasing mix for 3 to 5 people.',
  },
  group: {
    id: 'group',
    name: 'Group Pack',
    price: 70,
    tag: 'For 6+',
    image: '/images/jollof_rice.webp',
    items: ['6 × Shawarma Wraps or Jollof Rice', '2 × Grilled Chicken', '2 × Coleslaw'],
    desc: 'A generous spread for 6 or more: wraps, rice and sides.',
  },
};

export const INDIVIDUAL_MEAL = {
  id: 'individual',
  name: 'Individual Meal',
  priceEach: 11,
  image: '/images/ChickenShawarmaWrap.webp',
  items: ['1 × Chicken Shawarma Wrap or Jollof Rice', '1 × Side'],
  desc: 'A single satisfying Nigerian meal, ideal when a bundle is over budget.',
};

// ─── Core recommendation logic ────────────────────────────────────────────────
//
// Rules:
//   people <= 2          → Couple Pack  (£25)
//   people 3–5           → Friends Pack (£45)
//   people >= 6          → Group Pack   (£70)
//   budget < bundle cost → suggest individual meals instead
//
export function recommendBundle(people, budget) {
  const count = Math.max(1, Math.round(people));
  const funds = Math.max(0, Number(budget));

  // Step 1: pick bundle by headcount
  let bundle;
  if (count <= 2) bundle = BUNDLES.couple;
  else if (count <= 5) bundle = BUNDLES.friends;
  else bundle = BUNDLES.group;

  // Step 2: check budget
  if (funds >= bundle.price) {
    return {
      type: 'bundle',
      bundle,
      people: count,
      totalCost: bundle.price,
      budgetNote: null,
    };
  }

  // Budget too low for bundle, try individual meals
  const individualTotal = INDIVIDUAL_MEAL.priceEach * count;

  if (funds >= individualTotal) {
    return {
      type: 'individual',
      bundle: null,
      individual: INDIVIDUAL_MEAL,
      people: count,
      totalCost: individualTotal,
      budgetNote:
        `Your budget is £${funds}, below the ${bundle.name} (£${bundle.price}). ` +
        `We suggest ${count} individual meal${count > 1 ? 's' : ''} at ~£${individualTotal} total.`,
    };
  }

  // Budget very tight, return bundle anyway with a strong warning
  return {
    type: 'bundle',
    bundle,
    people: count,
    totalCost: bundle.price,
    budgetNote:
      `Your budget is £${funds}. The closest bundle is the ${bundle.name} at £${bundle.price}. ` +
      `Contact us on WhatsApp and we'll see what we can do.`,
  };
}
