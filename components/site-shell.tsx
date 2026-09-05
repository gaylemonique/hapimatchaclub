import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TabBar } from "@/components/tab-bar";

/**
 * Public chrome. Lives here rather than in the root layout so the admin area
 * renders without the customer header, footer and bottom tab bar.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <TabBar />
    </>
  );
}
