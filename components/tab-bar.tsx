"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1z" },
  { href: "/menu", label: "Menu", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/about", label: "About", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8h.01M11 12h1v5h1" },
  { href: "/order", label: "Order", icon: "M6 2 4 6v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6l-2-4zM4 6h16M16 10a4 4 0 0 1-8 0" },
];

export function TabBar() {
  const pathname = usePathname();
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // The staff area shares SiteShell but is not a customer surface — a bottom tab
  // bar would sit over its forms on a phone.
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav aria-label="Sections" className="tabbar">
      {tabs.map((tab) => (
        <Link aria-current={active(tab.href) ? "page" : undefined} href={tab.href} key={tab.href}>
          <svg
            aria-hidden="true"
            fill="none"
            height="21"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.75"
            viewBox="0 0 24 24"
            width="21"
          >
            <path d={tab.icon} />
          </svg>
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
