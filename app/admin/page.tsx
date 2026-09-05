import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminOperations } from "@/components/admin-operations";
import { AdminProductList } from "@/components/admin-product-list";
import { SiteShell } from "@/components/site-shell";
import { signOutAdmin } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/supabase-server";

export default async function AdminPage() {
  const { client, user } = await requireAdmin();
  if (!user) return <SiteShell><main className="admin-page"><p className="eyebrow">Staff access</p><h1>Hapi admin</h1><p className="admin-lede">Sign in to manage the public menu and availability.</p><AdminLoginForm /></main></SiteShell>;

  const [{ data: categories }, { data: products }, { data: addOns }, { data: channels }] = await Promise.all([
    client.from("categories").select("id, name, is_active").order("display_order"),
    client.from("products").select("id, name, slug, description, featured, is_available, category_id, categories(name), product_variants(id, name, size, price, original_price)").order("display_order"),
    client.from("add_ons").select("id, name, description, price, is_available").order("name"),
    client.from("ordering_channels").select("id, label, type, url, is_active").order("display_order"),
  ]);

  return <SiteShell><main className="admin-page"><div className="admin-header"><div><p className="eyebrow">Staff access</p><h1>Hapi admin</h1><p className="admin-lede">Update the menu visibility without editing code.</p></div><form action={signOutAdmin}><button className="button-secondary" type="submit">Sign out</button></form></div><AdminProductList categories={categories ?? []} products={products ?? []} /><AdminOperations addOns={addOns ?? []} channels={channels ?? []} /></main></SiteShell>;
}
