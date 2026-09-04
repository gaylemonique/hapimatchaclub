"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase-server";

const uuidPattern = /^[0-9a-f-]{36}$/i;

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
