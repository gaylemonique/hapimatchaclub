import Image from "next/image";
import Link from "next/link";
import { priceLabel, sizeLabel, type Product } from "@/lib/menu";

/**
 * Only two signals are carried, because only two exist in the seeded catalog:
 * the `featured` flag, and a pre-discount price. The bestseller/seasonal/new
 * tag styling stays in globals.css for when the catalog gains those fields.
 */
export function FaveTag({ float }: { float?: boolean }) {
  return <span className={`tag tag-bestseller${float ? " tag-float" : ""}`}>HAPI FAVE</span>;
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
    <Link className="card-tall" href={`/menu/${product.slug}`}>
      <div className="card-media">
        <Media product={product} sizes="(min-width: 1080px) 320px, (min-width: 768px) 33vw, 158px" />
        {product.featured && <FaveTag float />}
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
    <Link className="card-row" href={`/menu/${product.slug}`}>
      <div className="card-media">
        <Media product={product} sizes="104px" />
      </div>
      <div className="card-body">
        {product.featured && (
          <div className="card-tags">
            <FaveTag />
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
