import Image from "next/image";
import Link from "next/link";
import { ProductCardTall } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { AVAILABILITY, favoritesFrom, getMenu, tilesFrom } from "@/lib/menu";

export default async function Home() {
  const { sections, products, warning } = await getMenu();
  const favorites = favoritesFrom(products);
  const tiles = tilesFrom(sections);

  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-media">
          <Image
            alt="A Hapi matcha latte, layered green over milk, in a glass on a wooden board"
            fetchPriority="high"
            fill
            loading="eager"
            quality={90}
            sizes="(min-width: 1080px) 50vw, 100vw"
            src="/img/menu/hapi-matcha-latte.jpg"
          />
          <span className="hours-pill hours-pill-mobile">TODAY · 10AM–10PM</span>
          <span className="hours-pill hours-pill-desktop">HAPI MATCHA LATTE</span>
        </div>

        <div className="hero-card">
          <p className="eyebrow">Japanese matcha · hojicha · coffee · good food</p>
          <h1>
            A little matcha.
            <br />
            A lot of hapi.
          </h1>
          <p>
            A home-based matcha bar in Marikina serving handcrafted matcha drinks to make everyday
            hapi. {AVAILABILITY}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-ink" href="/menu">
              View menu
            </Link>
            <Link className="btn btn-outline" href="/order">
              Order now
            </Link>
          </div>
        </div>
      </section>

      {warning && (
        <p className="data-status page" role="status">
          {warning}
        </p>
      )}

      {favorites.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Hapi favorites</h2>
            <Link className="btn-link" href="/menu">
              All {products.length} →
            </Link>
          </div>
          <div className="rail">
            {favorites.map((product) => (
              <ProductCardTall key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {tiles.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Browse by</h2>
          </div>
          <div className="tiles">
            {tiles.map((tile) => (
              <Link className="tile" href={`/menu?cat=${encodeURIComponent(tile.cat)}`} key={tile.cat}>
                <Image alt="" fill quality={90} sizes="(min-width: 768px) 25vw, 50vw" src={tile.img} />
                <span className="tile-scrim" />
                <span className="tile-label">{tile.cat}</span>
                <span className="tile-count">{tile.count} ITEMS</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="bands">
        <section className="band band-sage">
          <p className="eyebrow">Our matcha</p>
          <h2>
            Japanese matcha.
            <br />
            Handcrafted, never rushed.
          </h2>
          <p>
            Ceremonial Japanese matcha and a mellow roasted hojicha, handcrafted in a home-based matcha
            bar in Marikina.
          </p>
          <Link className="btn btn-on-dark" href="/about">
            Read our story
          </Link>
        </section>

        <section className="band band-ink">
          <div>
            <h2>Ready when you are.</h2>
            <p>Order direct or on foodpanda — delivery or pickup.</p>
            <Link className="btn btn-primary" href="/order">
              Order now
            </Link>
          </div>
          <Image alt="" height={160} quality={90} src="/img/p-logo-orange.png" width={130} />
        </section>
      </div>
    </SiteShell>
  );
}
