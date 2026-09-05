import Image from "next/image";
import Link from "next/link";
import { ProductCardTall } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { categoryTiles, favorites, totalItems } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            alt="A Hapi matcha latte held in one hand"
            fetchPriority="high"
            fill
            loading="eager"
            quality={90}
            sizes="(min-width: 1080px) 50vw, 100vw"
            src="/img/p-hapi-cup.png"
          />
          <span className="hours-pill hours-pill-mobile">TODAY · 10AM–10PM</span>
          <span className="hours-pill hours-pill-desktop">HAPI MATCHA LATTE · ₱165</span>
        </div>

        <div className="hero-card">
          <p className="eyebrow">Japanese matcha · hojicha · coffee · good food</p>
          <h1>
            A little matcha.
            <br />
            A lot of hapi.
          </h1>
          <p>
            Whisked to order in a home cafe in Marikina. Uji matcha, roasted hojicha, and food worth the
            trip.
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

      <section className="section">
        <div className="section-head">
          <h2>Hapi favorites</h2>
          <Link className="btn-link" href="/menu">
            All {totalItems} →
          </Link>
        </div>
        <div className="rail">
          {favorites.map((product) => (
            <ProductCardTall key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Browse by</h2>
        </div>
        <div className="tiles">
          {categoryTiles.map((tile) => (
            <Link className="tile" href={`/menu?cat=${encodeURIComponent(tile.cat)}`} key={tile.cat}>
              <Image alt="" fill quality={90} sizes="(min-width: 768px) 25vw, 50vw" src={tile.img} />
              <span className="tile-scrim" />
              <span className="tile-label">{tile.label}</span>
              <span className="tile-count">{tile.count} ITEMS</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="bands">
        <section className="band band-sage">
          <p className="eyebrow">Our matcha</p>
          <h2>
            Uji-sourced.
            <br />
            Whisked, never shaken.
          </h2>
          <p>
            Small-lot ceremonial matcha from Uji, low-volume production, and a roasted hojicha we picked
            for how it behaves with milk.
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

      <SiteFooter />
    </>
  );
}
