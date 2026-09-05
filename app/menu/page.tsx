import Link from "next/link";
import type { Metadata } from "next";
import { ProductCardRow } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { categoryNames, getMenu, PRICE_NOTE, sectionsFor } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu | Hapi Matcha Club",
  description: "Matcha, hojicha, coffee, snacks and combos — the full Hapi Matcha Club menu.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const { sections, products, warning } = await getMenu();
  const names = categoryNames(sections);
  const active = cat && names.includes(cat) ? cat : "All";
  const visible = sectionsFor(sections, active);

  return (
    <SiteShell>
      <div className="menu-head">
        <div className="menu-head-row">
          <h1>Menu</h1>
          <p className="meta menu-count">{products.length} ITEMS</p>
        </div>
        <div aria-label="Filter the menu" className="chips" role="group">
          {names.map((name) => (
            <Link
              aria-current={name === active ? "true" : undefined}
              className="chip"
              href={name === "All" ? "/menu" : `/menu?cat=${encodeURIComponent(name)}`}
              key={name}
              scroll={false}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {warning && (
        <p className="data-status page" role="status">
          {warning}
        </p>
      )}

      <p className="notice page">{PRICE_NOTE}</p>

      {visible.length === 0 ? (
        <p className="menu-empty">Nothing in this category right now. Try another filter.</p>
      ) : (
        visible.map((section) => (
          <section className="menu-section" key={section.cat}>
            <div className="menu-section-head">
              <h2>{section.cat}</h2>
              <span className="meta">
                {section.items.length} {section.items.length === 1 ? "ITEM" : "ITEMS"}
              </span>
            </div>
            <div className="menu-list">
              {section.items.map((product) => (
                <ProductCardRow key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </SiteShell>
  );
}
