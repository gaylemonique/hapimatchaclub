import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "@/components/product-card";
import { SizePicker } from "@/components/size-picker";
import { addons, allProducts, peso, productById } from "@/lib/menu";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return { title: "Not found | Hapi Matcha Club" };
  return { title: `${product.name} | Hapi Matcha Club`, description: product.desc };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  return (
    <article className="product-detail">
      <div className="product-media">
        {product.img ? (
          <Image
            alt={product.name}
            fetchPriority="high"
            height={1000}
            loading="eager"
            quality={90}
            sizes="(min-width: 1080px) 50vw, 100vw"
            src={product.img}
            width={800}
          />
        ) : (
          <span aria-label={`Photo of ${product.name} not available yet`} className="photo-needed" role="img">
            PHOTO NEEDED — 4:5 PRODUCT SHOT
          </span>
        )}
        <Link aria-label="Back to menu" className="back-button" href="/menu">
          ←
        </Link>
      </div>

      <div className="product-sheet">
        <div className="product-tags">
          {product.tag && <Tag kind={product.tag} />}
          {product.soldOut && <Tag kind="SOLD OUT">SOLD OUT TODAY</Tag>}
          <span className="tag tag-cat">{product.cat.toUpperCase()}</span>
        </div>

        <h1>{product.name}</h1>
        <p className="product-desc">{product.desc}</p>

        <SizePicker sizes={product.sizes} soldOut={product.soldOut}>
          <section className="panel">
            <h2 className="eyebrow">What&apos;s in it</h2>
            <p>{product.notes}</p>
          </section>

          <section className="panel">
            <div className="panel-head">
              <h2 className="eyebrow">Add-ons</h2>
              <span className="meta">TO CONFIRM</span>
            </div>
            {addons.map((addon) => (
              <div className="addon-row" key={addon.name}>
                <span>{addon.name}</span>
                <b>{peso(addon.price)}</b>
              </div>
            ))}
          </section>
        </SizePicker>
      </div>
    </article>
  );
}
