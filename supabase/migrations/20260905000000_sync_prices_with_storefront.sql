-- Sync the catalog with Hapi's own ordering storefront (magic.mise-group.com),
-- read on 2026-09-05. Every price in the previous seed disagreed with the
-- storefront: those looked like a 20%-off snapshot, while the storefront is what
-- customers are charged today.
--
-- Scope of this migration:
--   1. Prices updated to the storefront's, and the stale original_price cleared
--   2. Descriptions replaced where the storefront has better copy
--   3. Products the storefront sells but the catalog lacks, inserted
--   4. Products the catalog has but the storefront does not, only listed in a
--      comment at the end — deactivating them is a judgement call for staff
--
-- Prices exclude drink customization; the storefront prices every drink from a
-- base with paid options on top.

begin;

-- 1 ────────────────────────────────────────────────────────── prices
-- original_price is set to null: the values it held implied a discount that no
-- longer matches anything the storefront shows.

with storefront(slug, price) as (values
  ('hapi-matcha-latte', 190),
  ('spring-garden-matcha-latte', 200),
  ('strawberry-matcha-latte', 220),
  ('mango-matcha-latte', 220),
  ('blueming-matcha-latte', 240),
  ('salted-cream-matcha-latte', 220),
  ('girlfriend-matcha-latte', 270),
  ('hapi-hojicha-latte', 180),
  ('tablea-hojicha-latte', 230),
  ('salted-cream-hojicha-latte', 210),
  ('peanut-butter-banana-hojicha-latte', 240),
  ('campfire-cookie-butter-hojicha-latte', 280),
  ('fresh-lemonade', 150),
  ('strawberry-milk', 180),
  ('chocolate-milk', 180),
  ('spanish-latte', 170),
  ('iced-americano', 160),
  ('strawberry-lemonade', 170),
  ('green-apple-soda', 160),
  ('strawberry-soda', 150),
  ('blueberry-soda', 150),
  ('banana-crumble-croffle', 160),
  ('biscoff-croffle', 180),
  ('classic-cheesy-eggdrop-sandwich', 170),
  ('chicken-eggdrop-sandwich', 230),
  ('salted-cream-latte', 200),
  ('vietnamese-inspired-egg-foam-cafe-latte', 240)
)
update public.product_variants v
set price = s.price,
    original_price = null
from storefront s
join public.products p on p.slug = s.slug
where v.product_id = p.id;

-- 2 ──────────────────────────────────────────────────── descriptions
-- Verbatim from the storefront, which writes these far better than the seed did.

with copy(slug, description) as (values
  ('hapi-matcha-latte', 'Classic matcha by hapi. Sweetened with agave.'),
  ('spring-garden-matcha-latte', 'Like a peaceful stroll through a blooming garden. Floral loose-leaf tea meets creamy oat milk and matcha for a delicate, comforting cup. Freshly steeped, so it may take a few extra minutes.'),
  ('strawberry-matcha-latte', 'Made with our homemade strawberry puree. Fruity, creamy, and guaranteed to make your day hapi-er.'),
  ('mango-matcha-latte', 'A tropical escape in a cup. Made with homemade mango purée, it pairs well with matcha for a bright, refreshing treat.'),
  ('blueming-matcha-latte', 'A dreamy blend of matcha, blue ternate flower, and collagen. Beautiful, refreshing, and made for your glow-up era.'),
  ('salted-cream-matcha-latte', 'A crowd favorite for a reason. Earthy matcha topped with our velvety salted cream for the perfect balance of sweet and creamy.'),
  ('hapi-hojicha-latte', 'Roasted, nutty, and comforting. If matcha feels too bold, hojicha is its cozy cousin — smooth, mellow, and easy to love.'),
  ('tablea-hojicha-latte', 'Crafted with our family-grown tablea and roasted hojicha. Chocolatey, nutty, and deeply comforting. Note: tablea is naturally rich in antioxidants and may have mild laxative effects. Contains dairy.'),
  ('salted-cream-hojicha-latte', 'Just like its matcha counterpart, this latte is the perfect blend of hojicha and salted cream.'),
  ('peanut-butter-banana-hojicha-latte', 'A comforting fusion of roasted hojicha, creamy peanut butter, and banana. Smooth, nutty, and naturally sweet — perfect for slow mornings and cozy afternoons.')
)
update public.products p
set description = c.description
from copy c
where p.slug = c.slug;

-- 3 ────────────────────────────────────────── products only on the storefront
-- Categories are assigned by name; adjust if staff would file them elsewhere.

insert into public.products (category_id, name, slug, description, featured, display_order)
select c.id, v.name, v.slug, v.description, v.featured, v.display_order
from (values
  ('special-matcha', 'Rose Lemonade Matcha', 'rose-lemonade-matcha', 'Floral, citrusy, and refreshing. Delicate rose meets bright lemonade and smooth matcha for a drink that tastes like sunshine in a cup.', false, 2),
  ('special-matcha', 'Lemon Curd Creamy Matcha Latte', 'lemon-curd-creamy-matcha-latte', 'Bright lemon curd folded into a creamy matcha latte.', false, 3),
  ('coffee-and-non-matcha-drinks', 'Classic Cafe Latte 14oz', 'classic-cafe-latte', 'A classic iced cafe latte.', false, 13),
  ('coffee-and-non-matcha-drinks', 'Yakult Lemonade 16oz', 'yakult-lemonade', 'Yakult and fresh lemonade over ice.', false, 14),
  ('snacks-and-appetizers', 'Breakfast Croffle', 'breakfast-croffle', 'A croffle to start the day.', false, 8),
  ('snacks-and-appetizers', 'Spam Eggdrop Sandwich', 'spam-eggdrop-sandwich', 'Eggdrop sandwich with spam.', false, 9)
) as v(category_slug, name, slug, description, featured, display_order)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category_id = excluded.category_id,
  display_order = excluded.display_order,
  is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select p.id, prices.name, prices.size, prices.price, null, 1
from (values
  ('rose-lemonade-matcha', 'Regular', 'Single size', 215),
  ('lemon-curd-creamy-matcha-latte', 'Regular', 'Single size', 220),
  ('classic-cafe-latte', '14 oz', '14 oz', 170),
  ('yakult-lemonade', '16 oz', '16 oz', 150),
  ('breakfast-croffle', 'Regular', 'Single size', 180),
  ('spam-eggdrop-sandwich', 'Regular', 'Single size', 210)
) as prices(slug, name, size, price)
join public.products p on p.slug = prices.slug
on conflict (product_id, size, name) do update set
  price = excluded.price,
  original_price = null,
  is_available = true;

commit;

-- 4 ─────────────────────────────────────────────── for staff to confirm
--
-- In the catalog but NOT on the storefront as of 2026-09-05. Left untouched
-- rather than deactivated, since they may simply be off the online menu:
--   plain-croffle, french-toast, bacon-eggdrop-sandwich, salted-cream-americano,
--   spam-musubi-and-lemonade, breakfast-croffle-and-hapi-matcha-latte
--
-- Name mismatches worth resolving:
--   banana-crumble-croffle  — the storefront calls this "Banana Croffle"
--   vietnamese-inspired-egg-foam-cafe-latte — the storefront calls this
--     "Vietnamese-Inspired Egg Foam Matcha Latte", and separately lists
--     "Vietnamese-Inspired Egg Foam Matcha" at 250, which may be a second
--     product or a size of the same one. Not inserted, because guessing wrong
--     would put a duplicate on the public menu.
--
-- Also on the storefront, not modelled here: per-drink paid options, which are
-- why prices vary by customization.
