-- Sync the catalog with Hapi's own ordering storefront (magic.mise-group.com),
-- read on 2026-09-05. Every price in the previous seed disagreed with the
-- storefront: those read as a 20%-off snapshot, while the storefront is what
-- customers are charged today.
--
-- Written as plain statements on purpose -- one UPDATE or INSERT per item, no
-- CTEs and no multi-table joins -- so that a failure names the exact line and
-- anything can be re-run on its own.
--
-- Prices are the base price. The storefront sells every drink with paid options
-- on top, which is why the site says prices vary by drink customization.

begin;

-- ---------------------------------------------------------------- prices
-- original_price is cleared: the values it held implied a discount that no
-- longer matches anything the storefront shows.

update public.product_variants set price = 190, original_price = null where product_id = (select id from public.products where slug = 'hapi-matcha-latte');
update public.product_variants set price = 200, original_price = null where product_id = (select id from public.products where slug = 'spring-garden-matcha-latte');
update public.product_variants set price = 220, original_price = null where product_id = (select id from public.products where slug = 'strawberry-matcha-latte');
update public.product_variants set price = 220, original_price = null where product_id = (select id from public.products where slug = 'mango-matcha-latte');
update public.product_variants set price = 240, original_price = null where product_id = (select id from public.products where slug = 'blueming-matcha-latte');
update public.product_variants set price = 220, original_price = null where product_id = (select id from public.products where slug = 'salted-cream-matcha-latte');
update public.product_variants set price = 270, original_price = null where product_id = (select id from public.products where slug = 'girlfriend-matcha-latte');
update public.product_variants set price = 180, original_price = null where product_id = (select id from public.products where slug = 'hapi-hojicha-latte');
update public.product_variants set price = 230, original_price = null where product_id = (select id from public.products where slug = 'tablea-hojicha-latte');
update public.product_variants set price = 210, original_price = null where product_id = (select id from public.products where slug = 'salted-cream-hojicha-latte');
update public.product_variants set price = 240, original_price = null where product_id = (select id from public.products where slug = 'peanut-butter-banana-hojicha-latte');
update public.product_variants set price = 280, original_price = null where product_id = (select id from public.products where slug = 'campfire-cookie-butter-hojicha-latte');
update public.product_variants set price = 150, original_price = null where product_id = (select id from public.products where slug = 'fresh-lemonade');
update public.product_variants set price = 180, original_price = null where product_id = (select id from public.products where slug = 'strawberry-milk');
update public.product_variants set price = 180, original_price = null where product_id = (select id from public.products where slug = 'chocolate-milk');
update public.product_variants set price = 170, original_price = null where product_id = (select id from public.products where slug = 'spanish-latte');
update public.product_variants set price = 160, original_price = null where product_id = (select id from public.products where slug = 'iced-americano');
update public.product_variants set price = 170, original_price = null where product_id = (select id from public.products where slug = 'strawberry-lemonade');
update public.product_variants set price = 160, original_price = null where product_id = (select id from public.products where slug = 'green-apple-soda');
update public.product_variants set price = 150, original_price = null where product_id = (select id from public.products where slug = 'strawberry-soda');
update public.product_variants set price = 150, original_price = null where product_id = (select id from public.products where slug = 'blueberry-soda');
update public.product_variants set price = 160, original_price = null where product_id = (select id from public.products where slug = 'banana-crumble-croffle');
update public.product_variants set price = 180, original_price = null where product_id = (select id from public.products where slug = 'biscoff-croffle');
update public.product_variants set price = 170, original_price = null where product_id = (select id from public.products where slug = 'classic-cheesy-eggdrop-sandwich');
update public.product_variants set price = 230, original_price = null where product_id = (select id from public.products where slug = 'chicken-eggdrop-sandwich');
update public.product_variants set price = 200, original_price = null where product_id = (select id from public.products where slug = 'salted-cream-latte');
update public.product_variants set price = 240, original_price = null where product_id = (select id from public.products where slug = 'vietnamese-inspired-egg-foam-cafe-latte');

-- ---------------------------------------------------------- descriptions
-- Verbatim from the storefront, which writes these better than the seed did.

update public.products set description = 'Classic matcha by hapi. Sweetened with agave.' where slug = 'hapi-matcha-latte';
update public.products set description = 'Like a peaceful stroll through a blooming garden. Floral loose-leaf tea meets creamy oat milk and matcha for a delicate, comforting cup. Freshly steeped, so it may take a few extra minutes.' where slug = 'spring-garden-matcha-latte';
update public.products set description = 'Made with our homemade strawberry puree. Fruity, creamy, and guaranteed to make your day hapi-er.' where slug = 'strawberry-matcha-latte';
update public.products set description = 'A tropical escape in a cup. Made with homemade mango puree, it pairs well with matcha for a bright, refreshing treat.' where slug = 'mango-matcha-latte';
update public.products set description = 'A dreamy blend of matcha, blue ternate flower, and collagen. Beautiful, refreshing, and made for your glow-up era.' where slug = 'blueming-matcha-latte';
update public.products set description = 'A crowd favorite for a reason. Earthy matcha topped with our velvety salted cream for the perfect balance of sweet and creamy.' where slug = 'salted-cream-matcha-latte';
update public.products set description = 'Roasted, nutty, and comforting. If matcha feels too bold, hojicha is its cozy cousin: smooth, mellow, and easy to love.' where slug = 'hapi-hojicha-latte';
update public.products set description = 'Crafted with our family-grown tablea and roasted hojicha. Chocolatey, nutty, and deeply comforting. Note: tablea is naturally rich in antioxidants and may have mild laxative effects. Contains dairy.' where slug = 'tablea-hojicha-latte';
update public.products set description = 'Just like its matcha counterpart, this latte is the perfect blend of hojicha and salted cream.' where slug = 'salted-cream-hojicha-latte';
update public.products set description = 'A comforting fusion of roasted hojicha, creamy peanut butter, and banana. Smooth, nutty, and naturally sweet, perfect for slow mornings and cozy afternoons.' where slug = 'peanut-butter-banana-hojicha-latte';

-- ------------------------------------------ products only on the storefront
-- Categories assigned by name; move them if staff would file them elsewhere.

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Rose Lemonade Matcha', 'rose-lemonade-matcha', 'Floral, citrusy, and refreshing. Delicate rose meets bright lemonade and smooth matcha for a drink that tastes like sunshine in a cup.', false, 2
from public.categories where slug = 'special-matcha'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Lemon Curd Creamy Matcha Latte', 'lemon-curd-creamy-matcha-latte', 'Bright lemon curd folded into a creamy matcha latte.', false, 3
from public.categories where slug = 'special-matcha'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Classic Cafe Latte 14oz', 'classic-cafe-latte', 'A classic iced cafe latte.', false, 13
from public.categories where slug = 'coffee-and-non-matcha-drinks'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Yakult Lemonade 16oz', 'yakult-lemonade', 'Yakult and fresh lemonade over ice.', false, 14
from public.categories where slug = 'coffee-and-non-matcha-drinks'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Breakfast Croffle', 'breakfast-croffle', 'A croffle to start the day.', false, 8
from public.categories where slug = 'snacks-and-appetizers'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select id, 'Spam Eggdrop Sandwich', 'spam-eggdrop-sandwich', 'Eggdrop sandwich with spam.', false, 9
from public.categories where slug = 'snacks-and-appetizers'
on conflict (slug) do update set name = excluded.name, description = excluded.description, category_id = excluded.category_id, is_available = true;

-- Their prices.

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, 'Regular', 'Single size', 215, null, 1 from public.products where slug = 'rose-lemonade-matcha'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, 'Regular', 'Single size', 220, null, 1 from public.products where slug = 'lemon-curd-creamy-matcha-latte'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, '14 oz', '14 oz', 170, null, 1 from public.products where slug = 'classic-cafe-latte'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, '16 oz', '16 oz', 150, null, 1 from public.products where slug = 'yakult-lemonade'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, 'Regular', 'Single size', 180, null, 1 from public.products where slug = 'breakfast-croffle'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select id, 'Regular', 'Single size', 210, null, 1 from public.products where slug = 'spam-eggdrop-sandwich'
on conflict (product_id, size, name) do update set price = excluded.price, original_price = null, is_available = true;

commit;

-- ------------------------------------------------- for staff to confirm
--
-- In the catalog but NOT on the storefront as of 2026-09-05. Left untouched
-- rather than deactivated, since they may simply be off the online menu:
--   plain-croffle, french-toast, bacon-eggdrop-sandwich, salted-cream-americano,
--   spam-musubi-and-lemonade, breakfast-croffle-and-hapi-matcha-latte
--
-- Name mismatches worth resolving:
--   banana-crumble-croffle is "Banana Croffle" on the storefront.
--   vietnamese-inspired-egg-foam-cafe-latte is "Vietnamese-Inspired Egg Foam
--   Matcha Latte" there, and a separate "Vietnamese-Inspired Egg Foam Matcha"
--   is listed at 250. That may be a second product or a size of the same one,
--   so it is not inserted here: guessing wrong would put a duplicate on the
--   public menu.
