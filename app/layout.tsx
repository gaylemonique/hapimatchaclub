import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import { AdminInviteCallback } from "@/components/admin-invite-callback";
import { Reveal } from "@/components/reveal";
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

const title = "Hapi Matcha Club | Matcha, hojicha, coffee, good food";
const description =
  "A home-based matcha bar in Marikina serving handcrafted matcha drinks to make everyday hapi. Available for pick-up, deliveries, and events.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title,
  description,
  applicationName: "Hapi Matcha Club",
  openGraph: { type: "website", siteName: "Hapi Matcha Club", title, description },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The arming script below adds `js-reveal` here before React hydrates, so the
    // client's class list legitimately differs from the server's. Suppression is
    // scoped to this element's own attributes and does not extend to children.
    <html
      className={`${caprasimo.variable} ${figtree.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: armReveal }} />
        <AdminInviteCallback />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
