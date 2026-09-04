export type Product = { slug: string; name: string; description: string; price: string; category: string; tag?: string; tone: "green" | "pink" | "orange" | "brown"; flavorNotes: string; variants: string[] };

// Research starting points from the supplied PRD. Prices and availability are intentionally not asserted yet.
export const featuredProducts: Product[] = [
  { slug: "hapi-matcha-latte", name: "Hapi Matcha Latte", description: "Creamy, bright, quietly earthy.", price: "Price to confirm", category: "Matcha", tag: "HAPI FAVE", tone: "green", flavorNotes: "Fresh matcha with a soft, creamy finish.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "strawberry-matcha-latte", name: "Strawberry Matcha Latte", description: "A soft berry note under smooth matcha.", price: "Price to confirm", category: "Seasonal", tag: "SEASONAL", tone: "pink", flavorNotes: "Sweet strawberry layered with bright matcha.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "hapi-hojicha-latte", name: "Hapi Hojicha Latte", description: "Toasty, mellow, and made for slow sips.", price: "Price to confirm", category: "Hojicha", tone: "brown", flavorNotes: "Roasted hojicha with a mellow, nutty finish.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
  { slug: "mango-matcha-latte", name: "Mango Matcha Latte", description: "Juicy mango with a fresh green finish.", price: "Price to confirm", category: "Matcha", tone: "orange", flavorNotes: "Bright mango balanced by grassy matcha.", variants: ["Regular · price to confirm", "Large · price to confirm"] },
];

export const categories = ["All", "Matcha", "Hojicha", "Coffee", "Non-Coffee", "Food", "Combos", "Seasonal"];
export function getProduct(slug: string) { return featuredProducts.find((product) => product.slug === slug); }
