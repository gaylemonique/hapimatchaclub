import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { HOURS } from "@/lib/menu";

export const metadata: Metadata = {
  title: "About | Hapi Matcha Club",
  description:
    "Hapi started at home in Marikina with one whisk, a scale, and an unreasonable interest in getting matcha right.",
};

const notes = [
  {
    title: "Uji, not generic",
    body: "Small-lot ceremonial matcha, low-volume production, single-farm sourcing.",
  },
  {
    title: "Made when you order it",
    body: "Whisked, poured and layered per cup. Nothing pre-batched.",
  },
  {
    title: "A hapi-er day",
    body: "Sweetened with muscovado if you want it. Bitter and clean if you don't.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">About</p>
        <h1>Kinda chic to start a matcha home cafe.</h1>
        <p>
          Hapi started at home in Marikina with one whisk, a scale, and an unreasonable interest in
          getting matcha right. We still make every cup to order.
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
            Home-based cafe, Marikina City. Exact address to be confirmed with Hapi.
          </p>
        </section>

        <Link className="btn btn-ink btn-block cta-block" href="/order">
          Order now
        </Link>
      </div>

      <SiteFooter />
    </>
  );
}
