import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { featuredProducts, getProduct } from "@/lib/menu";

export function generateStaticParams() { return featuredProducts.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = getProduct(slug); return product ? { title: `${product.name} | Hapi Matcha Club`, description: product.description } : {}; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <SiteShell><main className="product-detail"><Link className="back-link" href="/menu">← Back to menu</Link><div className="detail-grid"><div aria-label={`${product.name} product image placeholder`} className={`detail-media product-media ${product.tone === "green" ? "" : product.tone}`} role="img"><span className="art-label">hapi</span></div><div className="detail-copy"><p className="eyebrow">{product.category}{product.tag ? ` · ${product.tag}` : ""}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p><p className="detail-notes">{product.flavorNotes}</p><h2>Choose your size</h2><ul className="variant-list">{product.variants.map((variant) => <li key={variant}>{variant}</li>)}</ul><Link className="button-primary" href="/order">Order this drink</Link></div></div></main></SiteShell>;
}
