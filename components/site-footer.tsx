import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div><Link className="brand" href="/"><span className="brand-mark">H</span><span>Hapi Matcha Club</span></Link><small>Good drinks, good food, good moods.</small></div><div className="footer-links"><Link href="/menu">Menu</Link><Link href="/about">About</Link><Link href="/order">Order</Link></div></footer>;
}
