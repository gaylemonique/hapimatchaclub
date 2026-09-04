import { setCategoryActive, setProductAvailability } from "@/app/admin/actions";

type Category = { id: string; name: string; is_active: boolean };
type Product = { id: string; name: string; slug: string; is_available: boolean; categories: { name: string } | { name: string }[] | null };

export function AdminProductList({ categories, products }: { categories: Category[]; products: Product[] }) {
  return <>
    <section className="admin-section">
      <div className="admin-section-heading"><div><p className="eyebrow">Catalog controls</p><h2>Categories</h2></div><span>{categories.length} total</span></div>
      <div className="admin-category-list">{categories.map((category) => <form action={setCategoryActive} key={category.id}>
        <input name="categoryId" type="hidden" value={category.id} /><input name="isActive" type="hidden" value={String(!category.is_active)} />
        <span>{category.name}</span><button className="status-button" type="submit">{category.is_active ? "Active" : "Hidden"}</button>
      </form>)}</div>
    </section>
    <section className="admin-section">
      <div className="admin-section-heading"><div><p className="eyebrow">Catalog controls</p><h2>Products</h2></div><span>{products.length} total</span></div>
      <div className="admin-product-list">{products.map((product) => <form action={setProductAvailability} key={product.id}>
        <input name="productId" type="hidden" value={product.id} /><input name="isAvailable" type="hidden" value={String(!product.is_available)} />
        <div><strong>{product.name}</strong><small>{Array.isArray(product.categories) ? product.categories[0]?.name : product.categories?.name}</small></div>
        <button className="status-button" type="submit">{product.is_available ? "Available" : "Unavailable"}</button>
      </form>)}</div>
    </section>
  </>;
}
