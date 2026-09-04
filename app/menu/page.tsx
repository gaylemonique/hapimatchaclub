import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { categories, featuredProducts } from "@/lib/menu";

export default function MenuPage() {
  return <SiteShell><main className="menu-page"><div className="menu-intro"><div><p className="eyebrow">Take your pick</p><h1>The Hapi menu</h1></div><p>Browse the current menu by mood, flavor, or the thing you already know you want.</p></div><div aria-label="Menu categories" className="filter-row" role="tablist">{categories.map((category, index) => <button aria-selected={index === 0} className={`filter ${index === 0 ? "active" : ""}`} key={category} role="tab">{category}</button>)}</div><div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.name} product={product} />)}</div></main></SiteShell>;
}
