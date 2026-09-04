# Hapi Matcha Club launch checklist

## Automated checks

Run these from the project root while the production-equivalent app is available at `QA_BASE_URL` (defaults to `http://localhost:3000`):

```bash
pnpm lint
pnpm build
pnpm qa:smoke
```

The smoke test checks all public routes, the protected admin route, generated robots/sitemap routes, Supabase connectivity, and the expected 6-category / 33-product / 33-variant catalog counts. It never prints environment values.

The provider-neutral health endpoint is also available at `/api/health`. It returns HTTP 200 only when the public Supabase variables are configured and the expected catalog counts are available; it returns HTTP 503 otherwise and does not include credentials or database error details.

## Supabase checks

- Confirm all six public tables have RLS enabled.
- Confirm anonymous users can read active catalog rows only.
- Confirm non-admin authenticated users cannot write catalog or storage rows.
- Confirm the admin account has `app_metadata.role = admin`.
- Confirm the `product-images` bucket is public for reads and admin-only for writes.

## Production configuration

Set these in the hosting provider, never in Git:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-anon-key>
NEXT_PUBLIC_SITE_URL=https://<approved-domain>
```

After deployment, run the smoke test with `QA_BASE_URL` set to the deployed URL and manually verify the 390px, 768px, and 1440px layouts, keyboard navigation, contrast, unavailable products, inactive categories, admin login, and image uploads.

Use the deployed health endpoint as the hosting provider's readiness check:

```text
GET https://<approved-domain>/api/health
```

Before launch, set `app_metadata.role` to `admin` for the chosen Supabase Auth user and add the production values above in the hosting provider. Do not commit `.env.local` or any service-role key.
