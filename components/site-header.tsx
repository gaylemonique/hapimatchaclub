"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// "Order" is intentionally absent — the accent pill beside this nav already leads there.
const links = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <Image alt="" className="brand-mark" height={40} loading="eager" quality={90} src="/img/p-logo-avatar.png" width={40} />
        <span>
          <span className="brand-name">hapi matcha club</span>
          <span className="brand-sub">Marikina · matcha bar</span>
        </span>
      </Link>
      <span className="spacer" />
      <nav aria-label="Primary" className="site-nav">
        {links.map((link) => (
          <Link
            aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="btn btn-primary header-cta" href="/order">
        Order
      </Link>
    </header>
  );
}
