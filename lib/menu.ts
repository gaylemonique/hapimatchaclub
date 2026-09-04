export type Product = { name: string; description: string; price: string; tag?: string; tone: "green" | "pink" | "orange" | "brown" };

// Research starting points from the supplied PRD. Prices and availability are intentionally not asserted yet.
export const featuredProducts: Product[] = [
  { name: "Hapi Matcha Latte", description: "Creamy, bright, quietly earthy.", price: "Price to confirm", tag: "HAPI FAVE", tone: "green" },
  { name: "Strawberry Matcha Latte", description: "A soft berry note under smooth matcha.", price: "Price to confirm", tag: "SEASONAL", tone: "pink" },
  { name: "Hapi Hojicha Latte", description: "Toasty, mellow, and made for slow sips.", price: "Price to confirm", tone: "brown" },
  { name: "Mango Matcha Latte", description: "Juicy mango with a fresh green finish.", price: "Price to confirm", tone: "orange" },
];

export const categories = ["All", "Matcha", "Hojicha", "Coffee", "Non-Coffee", "Food", "Combos", "Seasonal"];
