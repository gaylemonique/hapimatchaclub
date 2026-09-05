// Menu content mirrors the seeded catalog on `deployment`
// (supabase/migrations/20260904000002_seed_hapi_menu.sql): observed ordering-platform
// prices, with `was` carrying the pre-discount price. Slugs match the seed exactly, so
// this can be swapped for `getPublicMenu()` without touching the components.

export type Size = {
  /** Shown on the size control — "Regular", "Large", "24 oz". */
  label: string;
  price: number;
  /** Pre-discount price, when the item is currently reduced. */
  was?: number;
};

export type Product = {
  id: string;
  name: string;
  desc: string;
  img: string | null;
  /** Seeded `featured` flag — drives the favorites rail on the home page. */
  featured?: boolean;
  sizes: Size[];
};

export type Category = { cat: string; items: Product[] };

const size = (label: string, price: number, was?: number): Size => ({ label, price, was });

export const catalog: Category[] = [
  {
    cat: "Special Matcha",
    items: [
      { id: "girlfriend-matcha-latte", name: "Girlfriend Matcha Latte", desc: "House-made strawberry puree, strawberry milk, Japanese matcha, sea-salt cream, and freeze-dried strawberries.", img: "/img/p-rose-matcha.png", featured: true, sizes: [size("Regular", 240, 300)] },
    ],
  },
  {
    cat: "Iced Matcha Drinks",
    items: [
      { id: "hapi-matcha-latte", name: "Hapi Matcha Latte", desc: "Ceremonial matcha with oat milk and agave.", img: "/img/p-hapi-cup.png", featured: true, sizes: [size("Regular", 200, 250)] },
      { id: "salted-cream-matcha-latte", name: "Salted Cream Matcha Latte", desc: "Japanese matcha latte finished with salted cream.", img: "/img/p-salted-cream.png", sizes: [size("Regular", 240, 300)] },
      { id: "blueming-matcha-latte", name: "Blueming Matcha Latte", desc: "Matcha with butterfly-pea flower and collagen.", img: "/img/p-blueming.png", sizes: [size("Regular", 256, 320)] },
      { id: "mango-matcha-latte", name: "Mango Matcha Latte", desc: "Japanese matcha with homemade sugar-free mango puree.", img: null, featured: true, sizes: [size("Regular", 240, 300)] },
      { id: "strawberry-matcha-latte", name: "Strawberry Matcha Latte", desc: "Japanese matcha with monkfruit-sweetened strawberry puree.", img: "/img/p-strawberry-matcha.png", featured: true, sizes: [size("Regular", 240, 300)] },
      { id: "spring-garden-matcha-latte", name: "Spring Garden Matcha Latte", desc: "Floral loose-leaf tea, oat milk, and Japanese matcha.", img: "/img/p-lemon-cold.png", sizes: [size("Regular", 240, 300)] },
      { id: "hapi-hojicha-latte", name: "Hapi Hojicha Latte", desc: "Japanese hojicha with a mellow roasted finish.", img: "/img/p-hojicha-pour.png", featured: true, sizes: [size("Regular", 192, 240)] },
      { id: "peanut-butter-banana-hojicha-latte", name: "Peanut Butter Banana Hojicha Latte", desc: "Japanese hojicha with peanut butter and banana.", img: null, sizes: [size("Regular", 216, 270)] },
      { id: "salted-cream-hojicha-latte", name: "Salted Cream Hojicha Latte", desc: "Japanese hojicha latte finished with salted cream.", img: "/img/p-hojicha-slay.png", sizes: [size("Regular", 200, 250)] },
    ],
  },
  {
    cat: "Iced Hojicha Drinks",
    items: [
      { id: "campfire-cookie-butter-hojicha-latte", name: "Campfire Cookie Butter Hojicha Latte", desc: "Large-only roasted hojicha latte with cookie-butter flavor.", img: null, sizes: [size("Large", 280, 350)] },
      { id: "tablea-hojicha-latte", name: "Tablea Hojicha Latte", desc: "Japanese hojicha latte with tablea chocolate.", img: null, sizes: [size("Regular", 200, 250)] },
    ],
  },
  {
    cat: "Coffee & Non-Matcha Drinks",
    items: [
      { id: "salted-cream-americano", name: "Salted Cream Americano", desc: "Iced Americano finished with salted cream.", img: "/img/p-pinoy-fave.png", sizes: [size("Regular", 200, 250)] },
      { id: "iced-americano", name: "Iced Americano", desc: "Classic iced Americano.", img: null, sizes: [size("Regular", 176, 220)] },
      { id: "spanish-latte", name: "Spanish Latte", desc: "Iced coffee with a sweet, creamy finish.", img: null, sizes: [size("Regular", 200, 250)] },
      { id: "strawberry-milk", name: "Strawberry Milk", desc: "Cold strawberry milk.", img: null, sizes: [size("Regular", 160, 200)] },
      { id: "chocolate-milk", name: "Chocolate Milk", desc: "Cold chocolate milk.", img: null, sizes: [size("Regular", 160, 200)] },
      { id: "fresh-lemonade", name: "Fresh Lemonade", desc: "Fresh lemonade.", img: "/img/p-lemonade-hand.png", sizes: [size("Regular", 144, 180)] },
      { id: "vietnamese-inspired-egg-foam-cafe-latte", name: "Vietnamese-Inspired Egg Foam Cafe Latte", desc: "Cafe latte topped with Vietnamese-inspired egg foam.", img: "/img/p-egg-matcha.png", sizes: [size("Regular", 216, 270)] },
      { id: "salted-cream-latte", name: "Salted Cream Latte", desc: "Latte finished with salted cream.", img: null, sizes: [size("Regular", 208, 260)] },
      { id: "green-apple-soda", name: "Green Apple Soda", desc: "Sparkling green apple drink.", img: "/img/p-yuzu-soda.png", sizes: [size("Regular", 160, 200)] },
      { id: "strawberry-soda", name: "Strawberry Soda", desc: "24 oz sparkling strawberry drink.", img: null, sizes: [size("24 oz", 152, 190)] },
      { id: "blueberry-soda", name: "Blueberry Soda", desc: "Sparkling blueberry drink.", img: null, sizes: [size("Regular", 152, 190)] },
      { id: "strawberry-lemonade", name: "Strawberry Lemonade", desc: "Strawberry lemonade.", img: null, sizes: [size("Regular", 144, 180)] },
    ],
  },
  {
    cat: "Snacks & Appetizers",
    items: [
      { id: "plain-croffle", name: "Plain Croffle", desc: "Plain croffle.", img: null, sizes: [size("Regular", 144, 180)] },
      { id: "banana-crumble-croffle", name: "Banana Crumble Croffle", desc: "Croffle with banana crumble.", img: null, sizes: [size("Regular", 184, 230)] },
      { id: "classic-cheesy-eggdrop-sandwich", name: "Classic Cheesy Eggdrop Sandwich", desc: "Cheesy eggdrop sandwich.", img: "/img/p-sandwich.png", sizes: [size("Regular", 160, 200)] },
      { id: "bacon-eggdrop-sandwich", name: "Bacon Eggdrop Sandwich", desc: "Eggdrop sandwich with bacon.", img: null, sizes: [size("Regular", 200, 250)] },
      { id: "chicken-eggdrop-sandwich", name: "Chicken Eggdrop Sandwich", desc: "Eggdrop sandwich with chicken.", img: null, sizes: [size("Regular", 216, 270)] },
      { id: "biscoff-croffle", name: "Biscoff Croffle", desc: "Croffle with Biscoff.", img: "/img/p-biscoff-croffle.png", sizes: [size("Regular", 208, 260)] },
      { id: "french-toast", name: "French Toast", desc: "One thick slice with honey and seasonal fruit.", img: null, sizes: [size("Regular", 144, 180)] },
    ],
  },
  {
    cat: "Combo Meals",
    items: [
      { id: "breakfast-croffle-and-hapi-matcha-latte", name: "Breakfast Croffle & Hapi Matcha Latte", desc: "Breakfast combo with a croffle and Hapi Matcha Latte.", img: "/img/p-three-cups.png", sizes: [size("Regular", 336, 420)] },
      { id: "spam-musubi-and-lemonade", name: "Spam Musubi & Lemonade", desc: "Spam musubi with homemade lemonade.", img: null, sizes: [size("Regular", 248, 310)] },
    ],
  },
];

export const categories = ["All", ...catalog.map((section) => section.cat)];

// External ordering channels. Ordering always leaves the site — no checkout lives here.
export const ORDER_URL = "https://www.foodpanda.ph/restaurant/rgsp/hapi-matcha-club-marikina";
export const DIRECT_ORDER_URL = "https://magic.mise-group.com/hapi-matcha-club";
export const INSTAGRAM_URL = "https://www.instagram.com/hapimatchaclub/";

export const peso = (n: number) => `₱${n}`;

export const priceLabel = (p: Product) => {
  const prices = p.sizes.map((s) => s.price);
  return prices.length > 1 ? `${peso(prices[0])} / ${peso(prices[prices.length - 1])}` : peso(prices[0]);
};

/** The pre-discount price, when every size is currently reduced. */
export const wasLabel = (p: Product) => {
  const first = p.sizes[0];
  return first.was && first.was > first.price ? peso(first.was) : null;
};

export const sizeLabel = (p: Product) => p.sizes.map((s) => s.label).join(" · ");

/** Every product, each carrying the category it belongs to. */
export const allProducts: (Product & { cat: string })[] = catalog.flatMap((section) =>
  section.items.map((item) => ({ ...item, cat: section.cat })),
);

export const productById = (id: string) => allProducts.find((p) => p.id === id);

export const totalItems = allProducts.length;

/** Sections behind a menu filter chip. */
export function sectionsFor(cat: string): Category[] {
  const sections = cat === "All" ? catalog : catalog.filter((s) => s.cat === cat);
  return sections.filter((s) => s.items.length > 0);
}

/** The seeded favorites, limited to those with photography for the home rail. */
export const favorites = allProducts.filter((p) => p.featured && p.img).slice(0, 4);

export const categoryTiles = [
  { label: "Iced Matcha", cat: "Iced Matcha Drinks", img: "/img/p-strawberry-matcha.png" },
  { label: "Hojicha", cat: "Iced Hojicha Drinks", img: "/img/p-hojicha-slay.png" },
  { label: "Coffee", cat: "Coffee & Non-Matcha Drinks", img: "/img/p-egg-matcha.png" },
  { label: "Snacks", cat: "Snacks & Appetizers", img: "/img/p-biscoff-croffle.png" },
].map((t) => ({ ...t, count: allProducts.filter((p) => p.cat === t.cat).length }));

export const HOURS = [
  { days: "Mon – Sat", time: "10:00 AM – 10:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];
