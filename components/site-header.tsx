"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return <header className="site-header"><Link className="brand" href="/" onClick={closeMenu}><span className="brand-mark">H</span><span>Hapi Matcha Club</span></Link><button aria-controls="primary-navigation" aria-expanded={isOpen} aria-label={isOpen ? "Close navigation" : "Open navigation"} className="nav-toggle" onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button><nav aria-label="Primary navigation" className={`nav ${isOpen ? "is-open" : ""}`} id="primary-navigation"><Link href="/" onClick={closeMenu}>Home</Link><Link href="/menu" onClick={closeMenu}>Menu</Link><Link href="/about" onClick={closeMenu}>About</Link><Link className="nav-cta" href="/order" onClick={closeMenu}>Order now</Link></nav></header>;
}
