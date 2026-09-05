import Image from "next/image";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { DIRECT_ORDER_URL, HOURS, INSTAGRAM_URL, ORDER_URL } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Order | Hapi Matcha Club",
  description: "Order Hapi Matcha Club direct or through foodpanda. Same menu, same prices.",
};

export default function OrderPage() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">Order</p>
        <h1>One tap and it&apos;s on the way.</h1>
        <p>
          Two ways to order — straight from us, or through foodpanda. Same menu, same prices.
        </p>
      </div>

      <div className="order-body page">
        <section className="channel-card channel-card-lead">
          <div className="channel-head">
            <Image alt="" className="channel-badge-img" height={46} quality={90} src="/img/p-logo-avatar.png" width={46} />
            <div>
              <p className="channel-name">Order direct</p>
              <p className="channel-status">Straight from Hapi · delivery &amp; pickup</p>
            </div>
          </div>
          <a
            className="btn btn-primary btn-block"
            href={DIRECT_ORDER_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Order direct ↗
          </a>
          <p className="disclaimer">OPENS HAPI&apos;S ORDERING PAGE · NO CHECKOUT ON THIS SITE</p>
        </section>

        <section className="channel-card">
          <div className="channel-head">
            <span aria-hidden="true" className="channel-badge">
              fp
            </span>
            <div>
              <p className="channel-name">foodpanda</p>
              <p className="channel-status">Delivery &amp; pickup</p>
            </div>
          </div>
          <a
            className="btn btn-outline btn-block"
            href={ORDER_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Order on foodpanda ↗
          </a>
          <p className="disclaimer">OPENS AN EXTERNAL APP · NO CHECKOUT ON THIS SITE</p>
        </section>

        <section className="hours-card">
          <h2 className="eyebrow">Pickup from us</h2>
          {HOURS.map((row) => (
            <div className="hours-row" key={row.days}>
              <span>{row.days}</span>
              <span>{row.time}</span>
            </div>
          ))}
          <p className="hours-note">
            Marikina City. Send us a message for the exact pin before you head over.
          </p>
        </section>

        <section className="contact-card">
          <Image alt="" height={42} quality={90} src="/img/p-logo-avatar.png" width={42} />
          <div className="contact-body">
            <p className="contact-handle">@hapimatchaclub</p>
            <p className="contact-note">Questions, custom orders, workshops</p>
          </div>
          <a className="btn btn-outline" href={INSTAGRAM_URL} rel="noopener noreferrer" target="_blank">
            Message
          </a>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
