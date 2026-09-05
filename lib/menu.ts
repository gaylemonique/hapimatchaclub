import { getSupabaseClient } from "@/lib/supabase";

// The menu is served from Supabase so staff can keep it accurate from the admin
// area. `fallbackSections` mirrors supabase/migrations/20260904000002_seed_hapi_menu.sql
// so the site still renders — with a notice — when Supabase is unconfigured or down.

export type Size = {
  /** Shown on the size control — "Regular", "Large", "24 oz". */
  label: string;
  price: number;
  /** `original_price` from the catalog. Carried but not displayed — the site
   *  shows the current price only. */
  was?: number;
};

export type Product = {
  /** Matches `products.slug`; the product route segment. */
  slug: string;
  name: string;
  desc: string;
  img: string | null;
  featured: boolean;
  cat: string;
  sizes: Size[];
};

export type Category = { cat: string; items: Product[] };

export type Menu = {
  sections: Category[];
  products: Product[];
  /** Set when the catalog came from the fallback rather than the database. */
  warning?: string;
};

const size = (label: string, price: number, was?: number): Size => ({ label, price, was });

/**
 * Bundled photography, keyed by slug. The database's own `image_url` wins when a
 * shot has been uploaded through the admin area; until then these stand in, so
 * the catalog doesn't render as a wall of empty photo slots.
 */
const fallbackImages: Record<string, string> = {
  // Hapi's own storefront photography (magic.mise-group.com), 667-1000px wide,
  // already cropped to the 4:5 the design uses.
  "hapi-matcha-latte": "/img/menu/hapi-matcha-latte.jpg",
  "girlfriend-matcha-latte": "/img/menu/girlfriend-matcha-latte.jpg",
  "salted-cream-matcha-latte": "/img/menu/salted-cream-matcha-latte.jpg",
  "blueming-matcha-latte": "/img/menu/blueming-matcha-latte.jpg",
  "mango-matcha-latte": "/img/menu/mango-matcha-latte.jpg",
  "strawberry-matcha-latte": "/img/menu/strawberry-matcha-latte.jpg",
  "spring-garden-matcha-latte": "/img/menu/spring-garden-matcha-latte.jpg",
  "hapi-hojicha-latte": "/img/menu/hapi-hojicha-latte.jpg",
  "salted-cream-hojicha-latte": "/img/menu/salted-cream-hojicha-latte.jpg",
  "tablea-hojicha-latte": "/img/menu/tablea-hojicha-latte.jpg",
  "campfire-cookie-butter-hojicha-latte": "/img/menu/campfire-cookie-butter-hojicha-latte.jpg",
  "vietnamese-inspired-egg-foam-cafe-latte": "/img/menu/vietnamese-inspired-egg-foam-matcha-latte.jpg",

  // Instagram-grid crops, ~350px. Still the only shot for these products.
  "salted-cream-americano": "/img/p-pinoy-fave.png",
  "fresh-lemonade": "/img/p-lemonade-hand.png",
  "green-apple-soda": "/img/p-yuzu-soda.png",
  "classic-cheesy-eggdrop-sandwich": "/img/p-sandwich.png",
  "biscoff-croffle": "/img/p-biscoff-croffle.png",
  "breakfast-croffle-and-hapi-matcha-latte": "/img/p-three-cups.png",
};

const item = (
  slug: string,
  name: string,
  desc: string,
  sizes: Size[],
  featured = false,
): Product => ({ slug, name, desc, sizes, featured, cat: "", img: fallbackImages[slug] ?? null });

const fallbackSections: Category[] = [
  {
    cat: "Special Matcha",
    items: [
      item("girlfriend-matcha-latte", "Girlfriend Matcha Latte", "House-made strawberry puree, strawberry milk, Japanese matcha, sea-salt cream, and freeze-dried strawberries.", [size("Regular", 270)], true),
    ],
  },
  {
    cat: "Iced Matcha Drinks",
    items: [
      item("hapi-matcha-latte", "Hapi Matcha Latte", "Ceremonial matcha with oat milk and agave.", [size("Regular", 190)], true),
      item("salted-cream-matcha-latte", "Salted Cream Matcha Latte", "Japanese matcha latte finished with salted cream.", [size("Regular", 220)]),
      item("blueming-matcha-latte", "Blueming Matcha Latte", "Matcha with butterfly-pea flower and collagen.", [size("Regular", 240)]),
      item("mango-matcha-latte", "Mango Matcha Latte", "Japanese matcha with homemade sugar-free mango puree.", [size("Regular", 220)], true),
      item("strawberry-matcha-latte", "Strawberry Matcha Latte", "Japanese matcha with monkfruit-sweetened strawberry puree.", [size("Regular", 220)], true),
      item("spring-garden-matcha-latte", "Spring Garden Matcha Latte", "Floral loose-leaf tea, oat milk, and Japanese matcha.", [size("Regular", 200)]),
      item("hapi-hojicha-latte", "Hapi Hojicha Latte", "Japanese hojicha with a mellow roasted finish.", [size("Regular", 180)], true),
      item("peanut-butter-banana-hojicha-latte", "Peanut Butter Banana Hojicha Latte", "Japanese hojicha with peanut butter and banana.", [size("Regular", 240)]),
      item("salted-cream-hojicha-latte", "Salted Cream Hojicha Latte", "Japanese hojicha latte finished with salted cream.", [size("Regular", 210)]),
    ],
  },
  {
    cat: "Iced Hojicha Drinks",
    items: [
      item("campfire-cookie-butter-hojicha-latte", "Campfire Cookie Butter Hojicha Latte", "Large-only roasted hojicha latte with cookie-butter flavor.", [size("Large", 280)]),
      item("tablea-hojicha-latte", "Tablea Hojicha Latte", "Japanese hojicha latte with tablea chocolate.", [size("Regular", 230)]),
    ],
  },
  {
    cat: "Coffee & Non-Matcha Drinks",
    items: [
      item("salted-cream-americano", "Salted Cream Americano", "Iced Americano finished with salted cream.", [size("Regular", 200, 250)]),
      item("iced-americano", "Iced Americano", "Classic iced Americano.", [size("Regular", 160)]),
      item("spanish-latte", "Spanish Latte", "Iced coffee with a sweet, creamy finish.", [size("Regular", 170)]),
      item("strawberry-milk", "Strawberry Milk", "Cold strawberry milk.", [size("Regular", 180)]),
      item("chocolate-milk", "Chocolate Milk", "Cold chocolate milk.", [size("Regular", 180)]),
      item("fresh-lemonade", "Fresh Lemonade", "Fresh lemonade.", [size("Regular", 150)]),
      item("vietnamese-inspired-egg-foam-cafe-latte", "Vietnamese-Inspired Egg Foam Cafe Latte", "Cafe latte topped with Vietnamese-inspired egg foam.", [size("Regular", 240)]),
      item("salted-cream-latte", "Salted Cream Latte", "Latte finished with salted cream.", [size("Regular", 200)]),
      item("green-apple-soda", "Green Apple Soda", "Sparkling green apple drink.", [size("Regular", 160)]),
      item("strawberry-soda", "Strawberry Soda", "24 oz sparkling strawberry drink.", [size("24 oz", 150)]),
      item("blueberry-soda", "Blueberry Soda", "Sparkling blueberry drink.", [size("Regular", 150)]),
      item("strawberry-lemonade", "Strawberry Lemonade", "Strawberry lemonade.", [size("Regular", 170)]),
    ],
  },
  {
    cat: "Snacks & Appetizers",
    items: [
      item("plain-croffle", "Plain Croffle", "Plain croffle.", [size("Regular", 144, 180)]),
      item("banana-crumble-croffle", "Banana Crumble Croffle", "Croffle with banana crumble.", [size("Regular", 160)]),
      item("classic-cheesy-eggdrop-sandwich", "Classic Cheesy Eggdrop Sandwich", "Cheesy eggdrop sandwich.", [size("Regular", 170)]),
      item("bacon-eggdrop-sandwich", "Bacon Eggdrop Sandwich", "Eggdrop sandwich with bacon.", [size("Regular", 200, 250)]),
      item("chicken-eggdrop-sandwich", "Chicken Eggdrop Sandwich", "Eggdrop sandwich with chicken.", [size("Regular", 230)]),
      item("biscoff-croffle", "Biscoff Croffle", "Croffle with Biscoff.", [size("Regular", 180)]),
      item("french-toast", "French Toast", "One thick slice with honey and seasonal fruit.", [size("Regular", 144, 180)]),
    ],
  },
  {
    cat: "Combo Meals",
    items: [
      item("breakfast-croffle-and-hapi-matcha-latte", "Breakfast Croffle & Hapi Matcha Latte", "Breakfast combo with a croffle and Hapi Matcha Latte.", [size("Regular", 336, 420)]),
      item("spam-musubi-and-lemonade", "Spam Musubi & Lemonade", "Spam musubi with homemade lemonade.", [size("Regular", 248, 310)]),
    ],
  },
].map((section) => ({ ...section, items: section.items.map((i) => ({ ...i, cat: section.cat })) }));

const OFFLINE_NOTICE = "Showing the seeded preview menu — connect Supabase to load the live catalog.";
const ERROR_NOTICE = "The live menu is temporarily unavailable. Showing the preview catalog.";

/** A products row as the query below returns it. */
type Row = {
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  featured: boolean | null;
  categories: { name?: string; display_order?: number } | { name?: string; display_order?: number }[] | null;
  product_variants:
    | {
        name: string | null;
        size: string | null;
        price: number;
        original_price: number | null;
        display_order: number | null;
        is_available: boolean | null;
      }[]
    | null;
};

function categoryOf(row: Row) {
  const relation = row.categories;
  const one = Array.isArray(relation) ? relation[0] : relation;
  return { name: one?.name ?? "Menu", order: one?.display_order ?? 999 };
}

function toProduct(row: Row): Product {
  const variants = (row.product_variants ?? [])
    .filter((variant) => variant.is_available !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  return {
    slug: row.slug,
    name: row.name,
    desc: row.description ?? "",
    img: row.image_url ?? fallbackImages[row.slug] ?? null,
    featured: row.featured === true,
    cat: categoryOf(row).name,
    sizes: variants.length
      ? variants.map((variant) =>
          size(
            variant.name ?? variant.size ?? "Regular",
            Number(variant.price),
            variant.original_price == null ? undefined : Number(variant.original_price),
          ),
        )
      : [size("Regular", 0)],
  };
}

/** Groups rows into categories, keeping the database's own ordering. */
function group(rows: Row[]): Category[] {
  const order = new Map<string, number>();
  const byCategory = new Map<string, Product[]>();

  for (const row of rows) {
    const { name, order: position } = categoryOf(row);
    if (!order.has(name)) order.set(name, position);
    byCategory.set(name, [...(byCategory.get(name) ?? []), toProduct(row)]);
  }

  return [...byCategory.entries()]
    .map(([cat, items]) => ({ cat, items }))
    .sort((a, b) => (order.get(a.cat) ?? 999) - (order.get(b.cat) ?? 999));
}

const asMenu = (sections: Category[], warning?: string): Menu => ({
  sections,
  products: sections.flatMap((section) => section.items),
  warning,
});

export async function getMenu(): Promise<Menu> {
  const client = getSupabaseClient();
  if (!client) return asMenu(fallbackSections, OFFLINE_NOTICE);

  const { data, error } = await client
    .from("products")
    .select(
      "slug, name, description, image_url, featured, display_order, categories(name, display_order), product_variants(name, size, price, original_price, display_order, is_available)",
    )
    .eq("is_available", true)
    .order("display_order");

  if (error || !data?.length) return asMenu(fallbackSections, ERROR_NOTICE);
  return asMenu(group(data as unknown as Row[]));
}

export async function getProduct(slug: string) {
  return (await getMenu()).products.find((product) => product.slug === slug);
}

// Hapi's own words, as they describe themselves.
export const TAGLINE =
  "A home-based matcha bar in Marikina serving handcrafted matcha drinks to make everyday hapi.";
export const AVAILABILITY = "Available for pick-up, deliveries, and events.";
export const ADDRESS = "Vista Valley Covered Court, Sto. Niño, Marikina";
// From Hapi's own storefront (magic.mise-group.com).
export const PHONE = "0995 065 3373";
export const PHONE_TEL = "+639950653373";
export const ORDER_POLICY = "Orders are final once placed.";

export const PRICE_NOTE = "Prices may vary depending on drink customization.";
export const DELIVERY_NOTE =
  "For deliveries, shipping fees and prices may vary depending on your location.";

// External ordering channels. Ordering always leaves the site — no checkout lives here.
export const ORDER_URL = "https://www.foodpanda.ph/restaurant/rgsp/hapi-matcha-club-marikina";
export const DIRECT_ORDER_URL = "https://magic.mise-group.com/hapi-matcha-club";
export const INSTAGRAM_URL = "https://www.instagram.com/hapimatchaclub/";

export const peso = (n: number) => `₱${n}`;

export const priceLabel = (p: Product) => {
  const prices = p.sizes.map((s) => s.price);
  return prices.length > 1 ? `${peso(prices[0])} / ${peso(prices[prices.length - 1])}` : peso(prices[0]);
};

export const sizeLabel = (p: Product) => p.sizes.map((s) => s.label).join(" · ");

export const categoryNames = (sections: Category[]) => ["All", ...sections.map((s) => s.cat)];

export const sectionsFor = (sections: Category[], cat: string) =>
  (cat === "All" ? sections : sections.filter((s) => s.cat === cat)).filter((s) => s.items.length > 0);

/** Featured products that have photography, for the home rail. */
export const favoritesFrom = (products: Product[]) =>
  products.filter((product) => product.featured && product.img).slice(0, 4);

/** Home tiles: one per category, illustrated by its first product with a photo. */
export const tilesFrom = (sections: Category[]) =>
  sections
    .map((section) => ({
      cat: section.cat,
      count: section.items.length,
      img: section.items.find((i) => i.img)?.img ?? null,
    }))
    .filter((tile): tile is { cat: string; count: number; img: string } => Boolean(tile.img))
    .slice(0, 4);

export const HOURS = [
  { days: "Mon – Sat", time: "10:00 AM – 10:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];
