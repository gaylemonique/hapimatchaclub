import type { Product } from "@/lib/menu";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link aria-label={`View ${product.name}`} href={`/menu/${product.slug}`}><div aria-label={`${product.name} product image`} className={`product-media ${product.tone === "green" ? "" : product.tone} ${product.imageUrl ? "has-image" : ""}`} role="img" style={product.imageUrl ? { backgroundImage: `url(${product.imageUrl})` } : undefined}><span className="art-label">{product.imageUrl ? "" : "hapi"}</span></div><div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><div className="product-meta"><span className="price">{product.price}</span>{product.tag && <span className="tag">{product.tag}</span>}</div></div></Link></article>;
}
