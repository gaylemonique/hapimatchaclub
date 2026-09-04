"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, type Product } from "@/lib/menu";

export function MenuBrowser({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProducts = useMemo(() => activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory), [activeCategory, products]);
  return <><div aria-label="Menu categories" className="filter-row" role="tablist">{categories.map((category) => <button aria-selected={activeCategory === category} className={`filter ${activeCategory === category ? "active" : ""}`} key={category} onClick={() => setActiveCategory(category)} role="tab">{category}</button>)}</div><p aria-live="polite" className="results-count">{filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} to explore</p><div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div></>;
}
