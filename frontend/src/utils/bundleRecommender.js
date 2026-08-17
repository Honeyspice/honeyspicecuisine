// ─── Bundle definitions ───────────────────────────────────────────────────────

export const BUNDLES = {
  couple: {
    id: 'couple',
    name: 'Couple Pack',
    price: 25,
    tag: 'For 2',
    image: '/images/ChickenShawarmaWrap.jpg',
    items: ['2 × Chicken Shawarma', '1 × Fries', '2 × Drinks'],
    desc: 'A perfect spread for two: classic shawarma with fries and drinks.',
  },
  friends: {
    id: 'friends',
    name: 'Friends Pack',
    price: 45,
    tag: 'For 3–5',
    image: '/images/shawarmafriescombo.jpg',
    items: ['4 × Chicken Shawarma', '2 × Fries', '1 × Large Drink'],
    desc: 'A crowd-pleasing mix for 3 to 5 people.',
  },
  group: {
    id: 'group',
    name: 'Group Pack',
    price: 70,
    tag: 'For 6+',
    image: '/images/jollof_rice.webp',
    items: ['6 × Shawarma or Rice Mix', '3 × Fries', '3 × Drinks'],
    desc: 'A generous spread for 6 or more: mix of shawarma and rice options.',
  },
};

export const INDIVIDUAL_MEAL = {
  id: 'individual',
  name: 'Individual Meal',
  priceEach: 11,
  image: '/images/ChickenShawarmaWrap.jpg',
  items: ['1 × Chicken Shawarma or Jollof Rice', '1 × Side', '1 × Drink'],
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
