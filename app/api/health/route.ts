import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const expectedCatalog = {
  categories: 6,
  products: 33,
  variants: 33,
};

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const [categories, products, variants] = await Promise.all([
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("product_variants").select("id", { count: "exact", head: true }),
  ]);

  const queryError = categories.error ?? products.error ?? variants.error;
  if (queryError) {
    return NextResponse.json(
      { ok: false, configured: true, error: "Catalog health check failed" },
      { status: 503 },
    );
  }

  const catalog = {
    categories: categories.count ?? 0,
    products: products.count ?? 0,
    variants: variants.count ?? 0,
  };
  const ready = Object.entries(expectedCatalog).every(
    ([key, expected]) => catalog[key as keyof typeof catalog] === expected,
  );

  return NextResponse.json(
    { ok: ready, configured: true, catalog },
    { status: ready ? 200 : 503 },
  );
}
