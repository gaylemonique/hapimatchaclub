"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase-server";

const uuidPattern = /^[0-9a-f-]{36}$/i;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function signInAdmin(_previousState: { error: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your admin email and password." };

  const { client } = await requireAdmin();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { error: "Those admin credentials could not be verified." };

  const { data: { user } } = await client.auth.getUser();
  if (user?.app_metadata?.role !== "admin") {
    await client.auth.signOut();
    return { error: "This account does not have admin access." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const { client } = await requireAdmin();
  await client.auth.signOut();
  redirect("/admin");
}

export async function setProductAvailability(formData: FormData) {
  const { client, user } = await requireAdmin();
  if (!user) return;

  const productId = String(formData.get("productId") ?? "");
  const isAvailable = formData.get("isAvailable") === "true";
  if (!uuidPattern.test(productId)) return;

  const { error } = await client.from("products").update({ is_available: isAvailable }).eq("id", productId);
  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/menu");
}

export async function setCategoryActive(formData: FormData) {
  const { client, user } = await requireAdmin();
  if (!user) return;

  const categoryId = String(formData.get("categoryId") ?? "");
  const isActive = formData.get("isActive") === "true";
  if (!uuidPattern.test(categoryId)) return;

  const { error } = await client.from("categories").update({ is_active: isActive }).eq("id", categoryId);
  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/menu");
}

export async function saveCategory(formData: FormData) {
  const { client, user } = await requireAdmin();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  if (!name || !slugPattern.test(slug) || (id && !uuidPattern.test(id))) return;
  const payload = { name, slug, description: String(formData.get("description") ?? "").trim() || null };
  const result = id ? await client.from("categories").update(payload).eq("id", id) : await client.from("categories").insert(payload);
  if (result.error) return;
  revalidatePath("/admin"); revalidatePath("/menu");
}

export async function saveProduct(formData: FormData) {
  const { client, user } = await requireAdmin();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  if (!name || !slugPattern.test(slug) || !uuidPattern.test(categoryId) || (id && !uuidPattern.test(id))) return;
  const payload = { category_id: categoryId, name, slug, description: String(formData.get("description") ?? "").trim() || null, featured: formData.get("featured") === "on", is_available: formData.get("isAvailable") === "on" };
  const result = id ? await client.from("products").update(payload).eq("id", id) : await client.from("products").insert(payload);
  if (result.error) return;
  revalidatePath("/admin"); revalidatePath("/"); revalidatePath("/menu");
}

export async function saveVariant(formData: FormData) {
  const { client, user } = await requireAdmin();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim() || "Single size";
  const price = Number(formData.get("price"));
  const original = Number(formData.get("originalPrice"));
  if (!name || !uuidPattern.test(productId) || !Number.isFinite(price) || price < 0 || (Number.isFinite(original) && original < price) || (id && !uuidPattern.test(id))) return;
  const payload = { product_id: productId, name, size, price, original_price: Number.isFinite(original) ? original : null };
  const result = id ? await client.from("product_variants").update(payload).eq("id", id) : await client.from("product_variants").insert(payload);
  if (result.error) return;
  revalidatePath("/admin"); revalidatePath("/"); revalidatePath("/menu");
}

export async function deleteVariant(formData: FormData) {
  const { client, user } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!user || !uuidPattern.test(id)) return;
  await client.from("product_variants").delete().eq("id", id);
  revalidatePath("/admin"); revalidatePath("/"); revalidatePath("/menu");
}
