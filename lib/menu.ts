// Catalog transcribed from the approved design canvas (Hapi Matcha Club.dc.html).
// Prices and availability are for design review and must be confirmed with Hapi before launch.

export type Tag = "BESTSELLER" | "NEW" | "SEASONAL" | "SPECIAL";

export type Size = { label: string; price: number };

export type Product = {
  id: string;
  name: string;
  desc: string;
  notes: string;
  img: string | null;
  tag?: Tag;
  soldOut?: boolean;
  sizes: Size[];
};

export type Category = { cat: string; items: Product[] };

const size = (label: string, price: number): Size => ({ label, price });

export const catalog: Category[] = [
  {
    cat: "Matcha",
    items: [
      { id: "hapi-matcha", name: "Hapi Matcha Latte", desc: "Ceremonial Uji matcha, cold milk, nothing hiding behind sugar.", notes: "Uji ceremonial matcha · fresh milk · muscovado on request", img: "/img/p-hapi-cup.png", tag: "BESTSELLER", sizes: [size("REG · 16OZ", 165), size("LRG · 22OZ", 195)] },
      { id: "girlfriend", name: "Girlfriend Matcha Latte", desc: "Rose, strawberry and matcha. Soft-hearted house special.", notes: "Matcha · rose · house strawberry purée · milk", img: "/img/p-rose-matcha.png", tag: "SPECIAL", sizes: [size("REG · 16OZ", 185), size("LRG · 22OZ", 215)] },
      { id: "salted-cream-matcha", name: "Salted Cream Matcha Latte", desc: "A salted cream cap over cold matcha. Stir it in or sip through it.", notes: "Matcha · milk · salted cream", img: "/img/p-salted-cream.png", tag: "BESTSELLER", sizes: [size("REG · 16OZ", 175), size("LRG · 22OZ", 205)] },
      { id: "blueming", name: "Blueming Matcha Latte", desc: "Blue ternate and collagen under a matcha layer.", notes: "Matcha · butterfly pea · collagen · milk", img: "/img/p-blueming.png", sizes: [size("REG · 16OZ", 185), size("LRG · 22OZ", 215)] },
      { id: "strawberry-matcha", name: "Strawberry Matcha Latte", desc: "Homemade strawberry purée, matcha poured over.", notes: "Matcha · house strawberry purée · milk", img: "/img/p-strawberry-matcha.png", sizes: [size("REG · 16OZ", 185), size("LRG · 22OZ", 215)] },
      { id: "lemon-curd", name: "Lemon Curd Matcha Latte", desc: "Bright lemon curd, matcha on top. Here for the season.", notes: "Matcha · house lemon curd · milk", img: "/img/p-lemon-matcha.png", tag: "SEASONAL", sizes: [size("REG · 16OZ", 185)] },
      { id: "spring-garden", name: "Spring Garden Matcha Latte", desc: "Citrus and herbs, light and clean. No milk.", notes: "Matcha · citrus · herb syrup · soda", img: "/img/p-lemon-cold.png", tag: "SEASONAL", sizes: [size("REG · 16OZ", 185)] },
    ],
  },
  {
    cat: "Hojicha",
    items: [
      { id: "hapi-hojicha", name: "Hapi Hojicha Latte", desc: "Roasted, toasty, gentle. The rainy-day order.", notes: "Roasted hojicha · fresh milk", img: "/img/p-hojicha-pour.png", tag: "BESTSELLER", sizes: [size("REG · 16OZ", 165), size("LRG · 22OZ", 195)] },
      { id: "salted-cream-hojicha", name: "Salted Cream Hojicha Latte", desc: "Roasted hojicha under a salted cream cap.", notes: "Hojicha · milk · salted cream", img: "/img/p-hojicha-slay.png", sizes: [size("REG · 16OZ", 175), size("LRG · 22OZ", 205)] },
      { id: "pb-banana", name: "Peanut Butter Banana Hojicha", desc: "Creamy, nutty, faintly dessert.", notes: "Hojicha · peanut butter · banana · milk", img: null, sizes: [size("REG · 16OZ", 195)] },
      { id: "tablea", name: "Tablea Hojicha Latte", desc: "Filipino tablea chocolate meets roasted tea.", notes: "Hojicha · tablea · milk", img: null, soldOut: true, sizes: [size("REG · 16OZ", 185)] },
    ],
  },
  {
    cat: "Coffee",
    items: [
      { id: "egg-foam", name: "Vietnamese-Inspired Egg Foam Latte", desc: "Whipped egg foam over cold coffee.", notes: "Espresso · condensed milk · whipped egg foam", img: "/img/p-egg-matcha.png", tag: "NEW", sizes: [size("REG · 16OZ", 175)] },
      { id: "salted-cream-americano", name: "Salted Cream Americano", desc: "Long black under a salted cream cap.", notes: "Espresso · water · salted cream", img: "/img/p-pinoy-fave.png", sizes: [size("REG · 16OZ", 145), size("LRG · 22OZ", 165)] },
      { id: "iced-americano", name: "Iced Americano", desc: "Two shots, ice, water. Done properly.", notes: "Espresso · water · ice", img: null, sizes: [size("REG · 16OZ", 120), size("LRG · 22OZ", 140)] },
      { id: "spanish-latte", name: "Spanish Latte", desc: "Condensed milk, espresso, cold.", notes: "Espresso · condensed milk · fresh milk", img: null, sizes: [size("REG · 16OZ", 155), size("LRG · 22OZ", 175)] },
    ],
  },
  {
    cat: "Non-Coffee",
    items: [
      { id: "lemonade", name: "Fresh Lemonade", desc: "Squeezed to order. Not from a bottle.", notes: "Fresh lemon · cane sugar · soda", img: "/img/p-lemonade-hand.png", sizes: [size("REG · 16OZ", 120), size("LRG · 22OZ", 140)] },
      { id: "green-apple-soda", name: "Green Apple Soda", desc: "Sharp, fizzy, green.", notes: "Green apple · soda · lime", img: "/img/p-yuzu-soda.png", sizes: [size("REG · 16OZ", 130)] },
      { id: "strawberry-milk", name: "Strawberry Milk", desc: "House purée, cold milk, nothing else.", notes: "House strawberry purée · fresh milk", img: null, sizes: [size("REG · 16OZ", 140)] },
    ],
  },
  {
    cat: "Food",
    items: [
      { id: "eggdrop", name: "Classic Cheesy Eggdrop Sandwich", desc: "Buttered brioche, soft egg, cheese.", notes: "Brioche · egg · cheese · house sauce", img: "/img/p-sandwich.png", tag: "BESTSELLER", sizes: [size("1 PC", 165)] },
      { id: "biscoff-croffle", name: "Biscoff Croffle", desc: "Croissant-waffle, cookie butter, crumb.", notes: "Croissant dough · cookie butter · biscuit crumb", img: "/img/p-biscoff-croffle.png", sizes: [size("1 PC", 155)] },
      { id: "bacon-eggdrop", name: "Bacon Eggdrop Sandwich", desc: "The same soft egg, plus bacon.", notes: "Brioche · egg · bacon · cheese", img: null, sizes: [size("1 PC", 185)] },
      { id: "french-toast", name: "French Toast", desc: "Thick-cut, slow-griddled, lightly sweet.", notes: "Thick-cut bread · butter · maple", img: null, sizes: [size("1 PC", 175)] },
    ],
  },
  {
    cat: "Combos",
    items: [
      { id: "breakfast-combo", name: "Breakfast Croffle & Hapi Matcha", desc: "One croffle, one 16oz matcha latte.", notes: "Plain croffle · Hapi Matcha Latte 16oz", img: "/img/p-three-cups.png", tag: "NEW", sizes: [size("SET", 290)] },
      { id: "musubi-combo", name: "Spam Musubi & Lemonade", desc: "Two musubi, one lemonade.", notes: "2 pc spam musubi · Fresh Lemonade 16oz", img: null, sizes: [size("SET", 250)] },
    ],
  },
];

export const categories = ["All", "Matcha", "Hojicha", "Coffee", "Non-Coffee", "Food", "Combos", "Seasonal"];

export const addons = [
  { name: "Extra matcha shot", price: 40 },
  { name: "Salted cream top", price: 35 },
  { name: "Oat milk", price: 30 },
  { name: "Extra espresso", price: 35 },
];

// External ordering channels. Ordering always leaves the site — no checkout lives here.
export const ORDER_URL = "https://www.foodpanda.ph/restaurant/rgsp/hapi-matcha-club-marikina";
export const DIRECT_ORDER_URL = "https://magic.mise-group.com/hapi-matcha-club";
export const INSTAGRAM_URL = "https://www.instagram.com/hapimatchaclub/";

export const peso = (n: number) => `₱${n}`;

export const priceLabel = (p: Product) => {
  const prices = p.sizes.map((s) => s.price);
  return prices.length > 1 ? `${peso(prices[0])} / ${peso(prices[prices.length - 1])}` : peso(prices[0]);
};

export const sizeLabel = (p: Product) =>
  p.sizes.length > 1 ? p.sizes.map((s) => s.label.split(" · ")[0]).join(" · ") : p.sizes[0].label;

/** Every product, each carrying the category it belongs to. */
export const allProducts: (Product & { cat: string })[] = catalog.flatMap((section) =>
  section.items.map((item) => ({ ...item, cat: section.cat })),
);

export const productById = (id: string) => allProducts.find((p) => p.id === id);

export const totalItems = allProducts.length;

/** Sections behind a menu filter chip. "Seasonal" cuts across categories. */
export function sectionsFor(cat: string): Category[] {
  if (cat === "Seasonal") return [{ cat: "Seasonal", items: allProducts.filter((p) => p.tag === "SEASONAL") }];
  const sections = cat === "All" ? catalog : catalog.filter((s) => s.cat === cat);
  return sections.filter((s) => s.items.length > 0);
}

export const favorites = ["hapi-matcha", "girlfriend", "hapi-hojicha", "eggdrop"]
  .map((id) => productById(id))
  .filter((p): p is Product & { cat: string } => Boolean(p));

export const categoryTiles = [
  { label: "Matcha", cat: "Matcha", img: "/img/p-strawberry-matcha.png" },
  { label: "Hojicha", cat: "Hojicha", img: "/img/p-hojicha-slay.png" },
  { label: "Coffee", cat: "Coffee", img: "/img/p-egg-matcha.png" },
  { label: "Food", cat: "Food", img: "/img/p-biscoff-croffle.png" },
].map((t) => ({ ...t, count: allProducts.filter((p) => p.cat === t.cat).length }));

export const HOURS = [
  { days: "Mon – Sat", time: "10:00 AM – 10:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];
