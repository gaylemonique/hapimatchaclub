-- Hapi Matcha Club menu foundation.
-- Product names, prices, images, and availability are intentionally not seeded here;
-- the supplied PRD identifies the research catalog as needing Hapi verification.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  display_order integer not null default 0 check (display_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  featured boolean not null default false,
  is_available boolean not null default true,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  size text,
  price numeric(10, 2) not null check (price >= 0),
  display_order integer not null default 0 check (display_order >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.add_ons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_add_ons (
  product_id uuid not null references public.products(id) on delete cascade,
  addon_id uuid not null references public.add_ons(id) on delete cascade,
  primary key (product_id, addon_id)
);

create table if not exists public.ordering_channels (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  type text not null check (type in ('delivery', 'social', 'direct', 'other')),
  url text not null,
  display_order integer not null default 0 check (display_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_public_order_idx on public.categories (display_order) where is_active;
create index if not exists products_category_order_idx on public.products (category_id, display_order) where is_available;
create index if not exists products_featured_idx on public.products (display_order) where featured and is_available;
create index if not exists product_variants_product_order_idx on public.product_variants (product_id, display_order) where is_available;
create index if not exists product_add_ons_addon_idx on public.product_add_ons (addon_id);
create index if not exists ordering_channels_public_order_idx on public.ordering_channels (display_order) where is_active;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists product_variants_set_updated_at on public.product_variants;
create trigger product_variants_set_updated_at before update on public.product_variants for each row execute function public.set_updated_at();
drop trigger if exists add_ons_set_updated_at on public.add_ons;
create trigger add_ons_set_updated_at before update on public.add_ons for each row execute function public.set_updated_at();
drop trigger if exists ordering_channels_set_updated_at on public.ordering_channels;
create trigger ordering_channels_set_updated_at before update on public.ordering_channels for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.add_ons enable row level security;
alter table public.product_add_ons enable row level security;
alter table public.ordering_channels enable row level security;

drop policy if exists "Public can view active categories" on public.categories;
create policy "Public can view active categories" on public.categories for select to anon, authenticated using (is_active);
drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "Public can view available products in active categories" on public.products;
create policy "Public can view available products in active categories" on public.products for select to anon, authenticated using (exists (select 1 from public.categories c where c.id = category_id and c.is_active));
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "Public can view available variants" on public.product_variants;
create policy "Public can view available variants" on public.product_variants for select to anon, authenticated using (is_available and exists (select 1 from public.products p join public.categories c on c.id = p.category_id where p.id = product_id and p.is_available and c.is_active));
drop policy if exists "Admins manage variants" on public.product_variants;
create policy "Admins manage variants" on public.product_variants for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "Public can view available add-ons" on public.add_ons;
create policy "Public can view available add-ons" on public.add_ons for select to anon, authenticated using (is_available);
drop policy if exists "Admins manage add-ons" on public.add_ons;
create policy "Admins manage add-ons" on public.add_ons for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "Public can view product add-ons" on public.product_add_ons;
create policy "Public can view product add-ons" on public.product_add_ons for select to anon, authenticated using (exists (select 1 from public.products p where p.id = product_id and p.is_available) and exists (select 1 from public.add_ons a where a.id = addon_id and a.is_available));
drop policy if exists "Admins manage product add-ons" on public.product_add_ons;
create policy "Admins manage product add-ons" on public.product_add_ons for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

drop policy if exists "Public can view active ordering channels" on public.ordering_channels;
create policy "Public can view active ordering channels" on public.ordering_channels for select to anon, authenticated using (is_active);
drop policy if exists "Admins manage ordering channels" on public.ordering_channels;
create policy "Admins manage ordering channels" on public.ordering_channels for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');

revoke all on table public.categories, public.products, public.product_variants, public.add_ons, public.product_add_ons, public.ordering_channels from anon, authenticated;
grant select on table public.categories, public.products, public.product_variants, public.add_ons, public.product_add_ons, public.ordering_channels to anon, authenticated;
grant insert, update, delete on table public.categories, public.products, public.product_variants, public.add_ons, public.product_add_ons, public.ordering_channels to authenticated;
