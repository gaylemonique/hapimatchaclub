import { getSupabaseClient } from "@/lib/supabase";

export type Product = { slug: string; name: string; description: string; price: string; category: string; tag?: string; tone: "green" | "pink" | "orange" | "brown"; flavorNotes: string; variants: string[] };
export const categories = ["All", "Matcha", "Hojicha", "Coffee", "Non-Coffee", "Food", "Combos", "Seasonal"];

// Research starting points from the supplied PRD. Prices and availability are intentionally not asserted yet.
export const fallbackProducts: Product[] = [
  { slug: "hapi-matcha-latte", name: "Hapi Matcha Latte", description: "Creamy, bright, quietly earthy.", price: "Price to confirm", category: "Matcha", tag: "HAPI FAVE", tone: "green", flavorNotes: "Fresh matcha with a soft, creamy finish.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "strawberry-matcha-latte", name: "Strawberry Matcha Latte", description: "A soft berry note under smooth matcha.", price: "Price to confirm", category: "Seasonal", tag: "SEASONAL", tone: "pink", flavorNotes: "Sweet strawberry layered with bright matcha.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "hapi-hojicha-latte", name: "Hapi Hojicha Latte", description: "Toasty, mellow, and made for slow sips.", price: "Price to confirm", category: "Hojicha", tone: "brown", flavorNotes: "Roasted hojicha with a mellow, nutty finish.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "mango-matcha-latte", name: "Mango Matcha Latte", description: "Juicy mango with a fresh green finish.", price: "Price to confirm", category: "Matcha", tone: "orange", flavorNotes: "Bright mango balanced by grassy matcha.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
];

export async function getPublicMenu(): Promise<{ products: Product[]; warning?: string }> {
  const client = getSupabaseClient();
  if (!client) return { products: fallbackProducts, warning: "Preview menu: connect Supabase to load the verified catalog." };
  const { data, error } = await client.from("products").select("name, slug, description, featured, is_available, display_order, categories(name), product_variants(name, size, price, display_order, is_available)").eq("is_available", true).order("display_order");
  if (error) return { products: fallbackProducts, warning: "The live menu is temporarily unavailable. Showing the preview catalog." };
  const products = (data ?? []).map((product) => {
    const variants = (product.product_variants ?? []).filter((variant: { is_available: boolean }) => variant.is_available !== false).map((variant: { name?: string; size?: string; price: number }) => `${variant.name ?? variant.size ?? "Size"} · ₱${variant.price}`);
    const categoryRelation = product.categories as unknown as { name?: string }[] | { name?: string } | null;
    const category = Array.isArray(categoryRelation) ? categoryRelation[0]?.name : categoryRelation?.name;
    return { slug: product.slug, name: product.name, description: product.description ?? "", price: variants[0] ?? "Price to confirm", category: category ?? "Seasonal", tone: "green" as const, flavorNotes: product.description ?? "", variants };
  });
  return { products };
}

export async function getPublicProduct(slug: string) { return (await getPublicMenu()).products.find((product) => product.slug === slug); }
