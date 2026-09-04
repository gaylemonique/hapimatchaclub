import { MenuBrowser } from "@/components/menu-browser";
import { SiteShell } from "@/components/site-shell";
import { getPublicMenu } from "@/lib/menu";

export default async function MenuPage() {
  const { products, warning } = await getPublicMenu();
  return <SiteShell><main className="menu-page"><div className="menu-intro"><div><p className="eyebrow">Take your pick</p><h1>The Hapi menu</h1></div><p>Browse the current menu by mood, flavor, or the thing you already know you want.</p></div>{warning && <p className="data-status" role="status">{warning}</p>}{products.length ? <MenuBrowser products={products} /> : <div className="empty-state"><h2>We’re refreshing the menu.</h2><p>Please check back soon.</p></div>}</main></SiteShell>;
}
