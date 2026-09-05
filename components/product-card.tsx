import Image from "next/image";
import Link from "next/link";
import { priceLabel, sizeLabel, type Product } from "@/lib/menu";

const tagClass: Record<string, string> = {
  BESTSELLER: "tag-bestseller",
  NEW: "tag-new",
  SEASONAL: "tag-seasonal",
  SPECIAL: "tag-special",
};

export function Tag({ children, float, kind }: { children?: string; float?: boolean; kind: string }) {
  return (
    <span className={`tag ${tagClass[kind] ?? "tag-soldout"}${float ? " tag-float" : ""}`}>
      {children ?? kind}
    </span>
  );
}

/** The photograph, or a labelled slot when a product has no shot yet. */
function Media({ product, sizes }: { product: Product; sizes: string }) {
  if (!product.img) {
    return (
      <span aria-label={`Photo of ${product.name} not available yet`} className="photo-needed" role="img">
        PHOTO NEEDED
      </span>
    );
  }
  return <Image alt={product.name} className="photo" fill quality={90} sizes={sizes} src={product.img} />;
}

/** Tall card — favorites rail on mobile, product grids on larger screens. */
export function ProductCardTall({ product }: { product: Product }) {
  return (
    <Link className="card-tall" href={`/menu/${product.id}`}>
      <div className="card-media">
        <Media product={product} sizes="(min-width: 1080px) 320px, (min-width: 768px) 33vw, 158px" />
        {product.tag && <Tag float kind={product.tag} />}
      </div>
      <div className="card-body">
        <div className="card-name">{product.name}</div>
        <p className="card-desc">{product.desc}</p>
        <div className="card-price">{priceLabel(product)}</div>
      </div>
    </Link>
  );
}

/** Row card — the scannable default on the menu. */
export function ProductCardRow({ product }: { product: Product }) {
  return (
    <Link className={`card-row${product.soldOut ? " card-soldout" : ""}`} href={`/menu/${product.id}`}>
      <div className="card-media">
        <Media product={product} sizes="96px" />
      </div>
      <div className="card-body">
        {(product.tag || product.soldOut) && (
          <div className="card-tags">
            {product.tag && <Tag kind={product.tag} />}
            {product.soldOut && <Tag kind="SOLD OUT">SOLD OUT TODAY</Tag>}
          </div>
        )}
        <div className="card-name">{product.name}</div>
        <p className="card-desc">{product.desc}</p>
        <div className="card-meta">
          <span className="card-price">{priceLabel(product)}</span>
          <span className="card-size">{sizeLabel(product)}</span>
        </div>
      </div>
    </Link>
  );
}
