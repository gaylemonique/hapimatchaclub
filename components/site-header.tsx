import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">H</span><span>Hapi Matcha Club</span></Link><nav aria-label="Primary navigation" className="nav"><Link href="/">Home</Link><Link href="/menu">Menu</Link><Link href="/about">About</Link><Link className="nav-cta" href="/order">Order now</Link></nav></header>;
}
