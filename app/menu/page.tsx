import Link from "next/link";
import type { Metadata } from "next";
import { ProductCardRow } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { categories, sectionsFor, totalItems } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu | Hapi Matcha Club",
  description: "Matcha, hojicha, coffee, non-coffee, food and combos — the full Hapi Matcha Club menu.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = cat && categories.includes(cat) ? cat : "All";
  const sections = sectionsFor(active);

  return (
    <>
      <div className="menu-head">
        <div className="menu-head-row">
          <h1>Menu</h1>
          <p className="meta menu-count">{totalItems} ITEMS · UPDATED TODAY</p>
        </div>
        <div aria-label="Filter the menu" className="chips" role="group">
          {categories.map((category) => (
            <Link
              aria-current={category === active ? "true" : undefined}
              className="chip"
              href={category === "All" ? "/menu" : `/menu?cat=${encodeURIComponent(category)}`}
              key={category}
              scroll={false}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {sections.length === 0 ? (
        <p className="menu-empty">Nothing in this category right now. Try another filter.</p>
      ) : (
        sections.map((section) => (
          <section className="menu-section" key={section.cat}>
            <div className="menu-section-head">
              <h2>{section.cat}</h2>
              <span className="meta">
                {section.items.length} {section.items.length === 1 ? "ITEM" : "ITEMS"}
              </span>
            </div>
            <div className="menu-list">
              {section.items.map((product) => (
                <ProductCardRow key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}

      <SiteFooter />
    </>
  );
}
