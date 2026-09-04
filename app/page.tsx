import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { getPublicMenu } from "@/lib/menu";

export default async function Home() {
  const { products } = await getPublicMenu();
  return <SiteShell><main><section className="hero"><div className="hero-grid"><div><p className="eyebrow">Japanese matcha · hojicha · good food</p><h1>A little matcha.<br /><em>A lot of hapi.</em></h1><p className="hero-copy">Slow mornings, bright afternoons, and drinks worth coming back for. Find your next favorite on the Hapi menu.</p><div className="hero-actions"><Link className="button-primary" href="/menu">View menu</Link><Link className="button-secondary" href="/order">Order now</Link></div></div><div aria-label="Illustrated matcha drink placeholder" className="hero-art" role="img"><div className="cup" /><span className="art-label">made for good moods</span></div></div></section><section className="section"><div className="section-heading"><h2>Hapi favorites</h2><Link className="section-link" href="/menu">See full menu →</Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></section><section className="story"><div className="story-inner"><h2>Good ingredients.<br />Better energy.</h2><p>Matcha and hojicha are the starting point, not the whole story. Hapi is a place for thoughtful drinks, good food, and a little lift in the middle of your day.</p></div></section></main></SiteShell>;
}
