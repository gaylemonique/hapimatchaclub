import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { ADDRESS, AVAILABILITY, HOURS, TAGLINE } from "@/lib/menu";

export const metadata: Metadata = {
  title: "About | Hapi Matcha Club",
  description:
    "A home-based matcha bar in Marikina serving handcrafted matcha drinks to make everyday hapi.",
};

// Each line here is traceable to the menu descriptions or Hapi's own bio —
// no sourcing or process claims beyond what the catalog actually says.
const notes = [
  {
    title: "Japanese matcha",
    body: "Ceremonial Japanese matcha, and a hojicha with a mellow roasted finish.",
  },
  {
    title: "Handcrafted",
    body: "Every drink is made by hand — matcha, hojicha, coffee and the food alongside them.",
  },
  {
    title: "Sweetened your way",
    body: "Oat milk and agave, monkfruit-sweetened strawberry, sugar-free mango puree.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="page-intro">
        <p className="eyebrow">About</p>
        <h1>Hope you have a hapi-er day.</h1>
        <p>
          {TAGLINE} {AVAILABILITY}
        </p>
      </div>

      <Image
        alt="Hojicha being poured into a cup"
        className="wide-photo"
        height={460}
        quality={90}
        src="/img/p-hojicha-pour.png"
        width={1440}
      />

      <div className="about-body page">
        <div className="stack-md">
          {notes.map((note) => (
            <section className="note-card" key={note.title}>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </section>
          ))}
        </div>

        <section className="hours-card">
          <h2 className="eyebrow">Open hours</h2>
          {HOURS.map((row) => (
            <div className="hours-row" key={row.days}>
              <span>{row.days}</span>
              <span>{row.time}</span>
            </div>
          ))}
          <p className="hours-note">
            {ADDRESS}
            <br />
            {AVAILABILITY}
          </p>
        </section>

        <Link className="btn btn-ink btn-block cta-block" href="/order">
          Order now
        </Link>
      </div>

    </SiteShell>
  );
}
