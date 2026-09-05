import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaveTag } from "@/components/product-card";
import { SizePicker } from "@/components/size-picker";
import { SiteShell } from "@/components/site-shell";
import { getMenu, getProduct } from "@/lib/menu";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await getMenu();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Not found | Hapi Matcha Club" };
  return { title: `${product.name} | Hapi Matcha Club`, description: product.desc };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <SiteShell>
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
            {product.featured && <FaveTag />}
            <span className="tag tag-cat">{product.cat.toUpperCase()}</span>
          </div>

          <h1>{product.name}</h1>
          <p className="product-desc">{product.desc}</p>

          <SizePicker sizes={product.sizes} />
        </div>
      </article>
    </SiteShell>
  );
}
