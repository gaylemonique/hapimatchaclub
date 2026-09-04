import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function OrderPage() { return <SiteShell><main><section className="simple-page order-page"><p className="eyebrow">Ready when you are</p><h1>Order your hapi.</h1><p>Choose the official Hapi ordering channel that works best for you. Links will be activated once the team confirms the launch details.</p><div className="order-list"><div><h2>Delivery</h2><p>Foodpanda link to be confirmed.</p></div><div><h2>Social ordering</h2><p>Instagram or direct message link to be confirmed.</p></div></div><Link className="button-secondary" href="/menu">Keep browsing the menu</Link></section></main></SiteShell>; }
