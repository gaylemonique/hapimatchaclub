import type { Product } from "@/lib/menu";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><div aria-label={`${product.name} product image placeholder`} className={`product-media ${product.tone === "green" ? "" : product.tone}`} role="img"><span className="art-label">hapi</span></div><div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><div className="product-meta"><span className="price">{product.price}</span>{product.tag && <span className="tag">{product.tag}</span>}</div></div></article>;
}
