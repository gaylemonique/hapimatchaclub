import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { TabBar } from "@/components/tab-bar";
import "./globals.css";

/**
 * Arms the scroll reveal before first paint, so revealed content is never drawn
 * and then hidden. The timeout is a failsafe: if the Reveal component hasn't
 * mounted shortly after load, the class is dropped and the page renders as
 * normal rather than sitting on hidden content.
 */
const armReveal = `(function(){try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('js-reveal');
setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js-reveal')},2500);
}catch(e){}})();`;

const caprasimo = Caprasimo({ subsets: ["latin"], weight: "400", variable: "--font-caprasimo", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Hapi Matcha Club | Matcha, hojicha, coffee, good food",
  description:
    "A little matcha. A lot of hapi. Whisked to order in a home cafe in Marikina — Uji matcha, roasted hojicha, and food worth the trip.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The arming script below adds `js-reveal` here before React hydrates, so the
    // client's class list legitimately differs from the server's. Suppression is
    // scoped to this element's own attributes and does not extend to children.
    <html
      className={`${caprasimo.variable} ${figtree.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: armReveal }} />
        <a className="visually-hidden" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <TabBar />
        <Reveal />
      </body>
    </html>
  );
}
