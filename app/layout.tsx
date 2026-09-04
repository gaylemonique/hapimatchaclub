import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: "Hapi Matcha Club | Matcha, hojicha, coffee, good food",
  description: "A little matcha. A lot of hapi. Browse the Hapi Matcha Club menu.",
  applicationName: "Hapi Matcha Club",
  openGraph: {
    type: "website",
    siteName: "Hapi Matcha Club",
    title: "Hapi Matcha Club | Matcha, hojicha, coffee, good food",
    description: "A little matcha. A lot of hapi. Browse the Hapi Matcha Club menu.",
  },
  twitter: {
    card: "summary",
    title: "Hapi Matcha Club | Matcha, hojicha, coffee, good food",
    description: "A little matcha. A lot of hapi. Browse the Hapi Matcha Club menu.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body></html>;
}
