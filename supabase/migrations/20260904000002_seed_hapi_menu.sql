-- Hapi Matcha Club menu seed, based on the current menu evidence supplied for Phase 2.
-- Prices are observed ordering-platform prices. Add-ons remain empty until their names/prices are confirmed.

alter table public.product_variants add column if not exists original_price numeric(10, 2) check (original_price is null or original_price >= price);
create unique index if not exists product_variants_product_size_name_idx on public.product_variants (product_id, size, name);

insert into public.categories (name, slug, display_order)
values
  ('Special Matcha', 'special-matcha', 1),
  ('Iced Matcha Drinks', 'iced-matcha-drinks', 2),
  ('Iced Hojicha Drinks', 'iced-hojicha-drinks', 3),
  ('Coffee & Non-Matcha Drinks', 'coffee-and-non-matcha-drinks', 4),
  ('Snacks & Appetizers', 'snacks-and-appetizers', 5),
  ('Combo Meals', 'combo-meals', 6)
on conflict (slug) do update set name = excluded.name, display_order = excluded.display_order, is_active = true;

insert into public.products (category_id, name, slug, description, featured, display_order)
select c.id, v.name, v.slug, v.description, v.featured, v.display_order
from (values
  ('special-matcha', 'Girlfriend Matcha Latte', 'girlfriend-matcha-latte', 'House-made strawberry puree, strawberry milk, Japanese matcha, sea-salt cream, and freeze-dried strawberries.', true, 1),
  ('iced-matcha-drinks', 'Hapi Matcha Latte', 'hapi-matcha-latte', 'Ceremonial matcha with oat milk and agave.', true, 1),
  ('iced-matcha-drinks', 'Salted Cream Matcha Latte', 'salted-cream-matcha-latte', 'Japanese matcha latte finished with salted cream.', false, 2),
  ('iced-matcha-drinks', 'Blueming Matcha Latte', 'blueming-matcha-latte', 'Matcha with butterfly-pea flower and collagen.', false, 3),
  ('iced-matcha-drinks', 'Mango Matcha Latte', 'mango-matcha-latte', 'Japanese matcha with homemade sugar-free mango puree.', true, 4),
  ('iced-matcha-drinks', 'Strawberry Matcha Latte', 'strawberry-matcha-latte', 'Japanese matcha with monkfruit-sweetened strawberry puree.', true, 5),
  ('iced-matcha-drinks', 'Spring Garden Matcha Latte', 'spring-garden-matcha-latte', 'Floral loose-leaf tea, oat milk, and Japanese matcha.', false, 6),
  ('iced-matcha-drinks', 'Hapi Hojicha Latte', 'hapi-hojicha-latte', 'Japanese hojicha with a mellow roasted finish.', true, 7),
  ('iced-matcha-drinks', 'Peanut Butter Banana Hojicha Latte', 'peanut-butter-banana-hojicha-latte', 'Japanese hojicha with peanut butter and banana.', false, 8),
  ('iced-matcha-drinks', 'Salted Cream Hojicha Latte', 'salted-cream-hojicha-latte', 'Japanese hojicha latte finished with salted cream.', false, 9),
  ('iced-hojicha-drinks', 'Campfire Cookie Butter Hojicha Latte', 'campfire-cookie-butter-hojicha-latte', 'Large-only roasted hojicha latte with cookie-butter flavor.', false, 1),
  ('iced-hojicha-drinks', 'Tablea Hojicha Latte', 'tablea-hojicha-latte', 'Japanese hojicha latte with tablea chocolate. Current public captures show a ₱200–₱240 observed range; seeded at the more recent ₱200 listing.', false, 2),
  ('coffee-and-non-matcha-drinks', 'Salted Cream Americano', 'salted-cream-americano', 'Iced Americano finished with salted cream.', false, 1),
  ('coffee-and-non-matcha-drinks', 'Iced Americano', 'iced-americano', 'Classic iced Americano.', false, 2),
  ('coffee-and-non-matcha-drinks', 'Spanish Latte', 'spanish-latte', 'Iced coffee with a sweet, creamy finish.', false, 3),
  ('coffee-and-non-matcha-drinks', 'Strawberry Milk', 'strawberry-milk', 'Cold strawberry milk.', false, 4),
  ('coffee-and-non-matcha-drinks', 'Chocolate Milk', 'chocolate-milk', 'Cold chocolate milk.', false, 5),
  ('coffee-and-non-matcha-drinks', 'Fresh Lemonade', 'fresh-lemonade', 'Fresh lemonade.', false, 6),
  ('coffee-and-non-matcha-drinks', 'Vietnamese-Inspired Egg Foam Cafe Latte', 'vietnamese-inspired-egg-foam-cafe-latte', 'Cafe latte topped with Vietnamese-inspired egg foam.', false, 7),
  ('coffee-and-non-matcha-drinks', 'Salted Cream Latte', 'salted-cream-latte', 'Latte finished with salted cream.', false, 8),
  ('coffee-and-non-matcha-drinks', 'Green Apple Soda', 'green-apple-soda', 'Sparkling green apple drink.', false, 9),
  ('coffee-and-non-matcha-drinks', 'Strawberry Soda', 'strawberry-soda', '24 oz sparkling strawberry drink.', false, 10),
  ('coffee-and-non-matcha-drinks', 'Blueberry Soda', 'blueberry-soda', 'Sparkling blueberry drink.', false, 11),
  ('coffee-and-non-matcha-drinks', 'Strawberry Lemonade', 'strawberry-lemonade', 'Strawberry lemonade.', false, 12),
  ('snacks-and-appetizers', 'Plain Croffle', 'plain-croffle', 'Plain croffle.', false, 1),
  ('snacks-and-appetizers', 'Banana Crumble Croffle', 'banana-crumble-croffle', 'Croffle with banana crumble.', false, 2),
  ('snacks-and-appetizers', 'Classic Cheesy Eggdrop Sandwich', 'classic-cheesy-eggdrop-sandwich', 'Cheesy eggdrop sandwich.', false, 3),
  ('snacks-and-appetizers', 'Bacon Eggdrop Sandwich', 'bacon-eggdrop-sandwich', 'Eggdrop sandwich with bacon.', false, 4),
  ('snacks-and-appetizers', 'Chicken Eggdrop Sandwich', 'chicken-eggdrop-sandwich', 'Eggdrop sandwich with chicken.', false, 5),
  ('snacks-and-appetizers', 'Biscoff Croffle', 'biscoff-croffle', 'Croffle with Biscoff.', false, 6),
  ('snacks-and-appetizers', 'French Toast', 'french-toast', 'One thick slice with honey and seasonal fruit.', false, 7),
  ('combo-meals', 'Breakfast Croffle & Hapi Matcha Latte', 'breakfast-croffle-and-hapi-matcha-latte', 'Breakfast combo with a croffle and Hapi Matcha Latte.', false, 1),
  ('combo-meals', 'Spam Musubi & Lemonade', 'spam-musubi-and-lemonade', 'Spam musubi with homemade lemonade.', false, 2)
) as v(category_slug, name, slug, description, featured, display_order)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do update set category_id = excluded.category_id, name = excluded.name, description = excluded.description, featured = excluded.featured, display_order = excluded.display_order, is_available = true;

with prices(slug, name, size, price, original_price, display_order) as (values
  ('girlfriend-matcha-latte', 'Regular', 'REG', 240, 300, 1),
  ('hapi-matcha-latte', 'Regular', 'REG', 200, 250, 1),
  ('salted-cream-matcha-latte', 'Regular', 'REG', 240, 300, 1),
  ('blueming-matcha-latte', 'Regular', 'REG', 256, 320, 1),
  ('mango-matcha-latte', 'Regular', 'REG', 240, 300, 1),
  ('strawberry-matcha-latte', 'Regular', 'REG', 240, 300, 1),
  ('spring-garden-matcha-latte', 'Regular', 'REG', 240, 300, 1),
  ('hapi-hojicha-latte', 'Regular', 'REG', 192, 240, 1),
  ('peanut-butter-banana-hojicha-latte', 'Regular', 'REG', 216, 270, 1),
  ('salted-cream-hojicha-latte', 'Regular', 'REG', 200, 250, 1),
  ('campfire-cookie-butter-hojicha-latte', 'Large', 'LRG', 280, 350, 1),
  ('tablea-hojicha-latte', 'Regular', 'REG', 200, 250, 1),
  ('salted-cream-americano', 'Regular', null, 200, 250, 1),
  ('iced-americano', 'Regular', null, 176, 220, 1),
  ('spanish-latte', 'Regular', null, 200, 250, 1),
  ('strawberry-milk', 'Regular', null, 160, 200, 1),
  ('chocolate-milk', 'Regular', null, 160, 200, 1),
  ('fresh-lemonade', 'Regular', null, 144, 180, 1),
  ('vietnamese-inspired-egg-foam-cafe-latte', 'Regular', null, 216, 270, 1),
  ('salted-cream-latte', 'Regular', null, 208, 260, 1),
  ('green-apple-soda', 'Regular', null, 160, 200, 1),
  ('strawberry-soda', '24 oz', '24 oz', 152, 190, 1),
  ('blueberry-soda', 'Regular', null, 152, 190, 1),
  ('strawberry-lemonade', 'Regular', null, 144, 180, 1),
  ('plain-croffle', 'Regular', null, 144, 180, 1),
  ('banana-crumble-croffle', 'Regular', null, 184, 230, 1),
  ('classic-cheesy-eggdrop-sandwich', 'Regular', null, 160, 200, 1),
  ('bacon-eggdrop-sandwich', 'Regular', null, 200, 250, 1),
  ('chicken-eggdrop-sandwich', 'Regular', null, 216, 270, 1),
  ('biscoff-croffle', 'Regular', null, 208, 260, 1),
  ('french-toast', 'Regular', null, 144, 180, 1),
  ('breakfast-croffle-and-hapi-matcha-latte', 'Regular', null, 336, 420, 1),
  ('spam-musubi-and-lemonade', 'Regular', null, 248, 310, 1)
)
insert into public.product_variants (product_id, name, size, price, original_price, display_order)
select p.id, prices.name, coalesce(prices.size, 'Single size'), prices.price, prices.original_price, prices.display_order
from prices join public.products p on p.slug = prices.slug
on conflict (product_id, size, name) do update set price = excluded.price, original_price = excluded.original_price, display_order = excluded.display_order, is_available = true;
