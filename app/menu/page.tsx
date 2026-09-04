import { MenuBrowser } from "@/components/menu-browser";
import { SiteShell } from "@/components/site-shell";
import { featuredProducts } from "@/lib/menu";

export default function MenuPage() {
  return <SiteShell><main className="menu-page"><div className="menu-intro"><div><p className="eyebrow">Take your pick</p><h1>The Hapi menu</h1></div><p>Browse the current menu by mood, flavor, or the thing you already know you want.</p></div><MenuBrowser products={featuredProducts} /></main></SiteShell>;
}
