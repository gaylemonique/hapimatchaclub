import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components cannot always mutate cookies; proxy.ts refreshes the session.
          }
        },
      },
    },
  );
}

export async function requireAdmin() {
  const client = await getSupabaseServerClient();
  const { data: { user } } = await client.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") return { client, user: null };
  return { client, user };
}
