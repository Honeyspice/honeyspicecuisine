// The menu, lifted out of pages/Menu.js so it is not trapped in the component
// that happens to render it. Search needs to read it, and so does anything else
// that follows. Menu.js imports from here, so there is still one definition.

export const MENU_CATEGORIES = [
  {
    id: 'wraps',
    title: 'Wraps',
    items: [
      { name: 'Chicken Shawarma Wrap', description: 'Toasted wrap with chicken, slaw and creamy pepper sauce', price: 10.99, image: '/images/ChickenShawarmaWrap.webp' },
      { name: 'Beef Shawarma Wrap', description: 'Grilled beef strips with fresh veg and pepper sauce in a toasted wrap', price: 11.99, image: '/images/beef-shawarma.webp' },
    ],
  },
  {
    id: 'rice-meals',
    title: 'Rice Meals',
    items: [
      { name: 'Jollof Rice', description: 'Traditional Nigerian jollof rice with your choice of protein', price: 12.99, image: '/images/jollof_rice.webp' },
      { name: 'Ofada Sauce Ayamase Stew', description: 'Jumbo Ofada rice with assorted meat, egg, ponmo and panla fish', price: 15.99, image: '/images/Ofada.webp' },
      { name: 'Coconut Rice', description: 'Fragrant rice cooked in coconut milk with vegetables', price: 12.99, image: '/images/White_Rice.webp' },
      { name: 'Fried Rice', description: 'Nigerian-style fried rice with mixed vegetables and protein', price: 12.99, image: '/images/Friedrice.webp' },
    ],
  },
  {
    id: 'soups',
    title: 'Soups and Swallow',
    items: [
      { name: 'Egusi Soup', description: 'Melon seed soup with assorted meat and fish, served with any swallow of your choice', price: 15.99, image: '/images/Egusi.webp' },
      { name: 'Efo Riro', description: 'Vegetable soup with assorted meat and fish, served with any swallow of your choice', price: 15.99, image: '/images/efo_riro.webp' },
      { name: 'Ogbono Soup', description: 'Wild mango seed soup with assorted meat and fish, served with any swallow of your choice', price: 15.99, image: '/images/ogbono.webp' },
      { name: 'Banga Soup', description: 'Palm nut soup with assorted meat and fish, served with any swallow of your choice', price: 15.99, image: '/images/banga.webp' },
      // Pepper Soup is the one soup not served with swallow.
      { name: 'Pepper Soup', description: 'Spicy meat or fish soup with traditional herbs', price: 15.99, image: '/images/peppersoup.webp' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Beef Suya', description: 'Spicy grilled beef skewers with suya spice and onions', price: 15.99, image: '/images/suya.webp' },
      // The only source available is 200x300, below the 840px card budget, so it
      // is used at native size rather than upscaled. It covers the 80x80 desktop
      // thumbnail comfortably but is stretched about 1.4x on the 277px mobile
      // card. Replace with a larger original when there is one.
      { name: 'Grilled Chicken', description: 'Flame-grilled chicken with house pepper glaze', price: 14.99, image: '/images/grilled-chicken.webp' },
      { name: 'Boli (Roasted Plantain)', description: 'Roasted plantain with spicy sauce', price: 9.99, image: '/images/boli.webp' },
      { name: 'Coleslaw', description: 'Fresh cabbage and carrot salad', price: 6.99, image: '/images/Coleslaw.webp' },
      { name: 'Akara', description: 'Crispy bean cakes, a classic Nigerian snack', price: 6.99, image: '/images/Akara.webp' },
    ],
  },
];

export const BUNDLES = [
  {
    id: 'couple-pack',
    name: 'Couple Pack',
    price: 25,
    tag: 'For 2',
    image: '/images/jollof_rice.webp',
    items: ['2 × Jollof Rice & Chicken', '1 × Coleslaw'],
    desc: 'A perfect spread for two: mains plus a shared side.',
  },
  {
    id: 'friends-pack',
    name: 'Friends Pack',
    price: 45,
    tag: 'For 4–6',
    // Was the shawarma-and-fries photograph, which showed a side we no longer
    // sell. The bundle is wraps, rice and a side, so a wrap photo is honest.
    image: '/images/ChickenShawarmaWrap.webp',
    items: ['4 × Shawarma Wraps', '1 × Large Jollof Rice', '1 × Coleslaw'],
    desc: 'A crowd-pleasing mix for a group of friends.',
  },
  {
    id: 'group-pack',
    name: 'Group Pack',
    price: 70,
    tag: 'For 8–12',
    image: '/images/Egusi.webp',
    items: ['Large Jollof Rice (serves 10)', 'Egusi Soup + swallow (serves 8)', '4 × Grilled Chicken'],
    desc: 'A generous Nigerian feast for large groups and events.',
  },
];

// Common ways people say these dishes that do not appear in the name or the
// description. Without these, "swallow" finds five soups but "pounded yam"
// finds nothing, and someone searching "shawarma" for a kebab gets no hint.
// Keys are item names exactly as above.
export const SYNONYMS = {
  'Jollof Rice': ['party rice', 'jellof', 'jolof'],
  'Egusi Soup': ['melon soup', 'egusi', 'swallow', 'pounded yam', 'eba', 'fufu', 'amala'],
  'Efo Riro': ['spinach stew', 'vegetable soup', 'swallow', 'pounded yam', 'eba', 'fufu', 'amala'],
  'Ogbono Soup': ['draw soup', 'swallow', 'pounded yam', 'eba', 'fufu', 'amala'],
  'Banga Soup': ['palm nut soup', 'ofe akwu', 'swallow', 'pounded yam', 'eba', 'fufu', 'amala'],
  // No 'swallow' here: it is the one soup not served with it, so a search for
  // "swallow" should not offer it.
  'Pepper Soup': ['peppersoup', 'nkwobi', 'spicy'],
  'Beef Suya': ['suya', 'kebab', 'skewers', 'grilled beef'],
  'Chicken Shawarma Wrap': ['shawarma', 'wrap', 'kebab'],
  'Beef Shawarma Wrap': ['shawarma', 'wrap', 'kebab'],
  'Boli (Roasted Plantain)': ['plantain', 'dodo', 'boli'],
  'Akara': ['bean cake', 'beans', 'vegetarian'],
  'Coleslaw': ['salad', 'vegetarian'],
  'Ofada Sauce Ayamase Stew': ['ayamase', 'ofada', 'designer stew', 'green stew'],
  'Coconut Rice': ['white rice'],
  'Fried Rice': ['fried rice'],
  'Grilled Chicken': ['chicken', 'grilled'],
};
