import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Hapi Matcha Club | Matcha, hojicha, coffee, good food",
  description: "A little matcha. A lot of hapi. Browse the Hapi Matcha Club menu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body></html>;
}
