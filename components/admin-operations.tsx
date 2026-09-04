import { saveAddOn, saveOrderingChannel } from "@/app/admin/actions";

type AddOn = { id: string; name: string; description: string | null; price: number; is_available: boolean };
type Channel = { id: string; label: string; type: string; url: string; is_active: boolean };

export function AdminOperations({ addOns, channels }: { addOns: AddOn[]; channels: Channel[] }) {
  return <>
    <section className="admin-section"><div className="admin-section-heading"><div><p className="eyebrow">Optional extras</p><h2>Add-ons</h2></div><span>{addOns.length} total</span></div>
      <form action={saveAddOn} className="admin-edit-form"><label>Name<input name="name" required /></label><label>Price<input min="0" name="price" step="0.01" type="number" required /></label><label>Description<input name="description" /></label><label><input defaultChecked name="isAvailable" type="checkbox" /> Available</label><button className="button-primary" type="submit">Add add-on</button></form>
      <div className="admin-category-list">{addOns.map((addOn) => <form action={saveAddOn} key={addOn.id}><input name="id" type="hidden" value={addOn.id} /><input defaultValue={addOn.name} name="name" required /><input defaultValue={addOn.price} min="0" name="price" step="0.01" type="number" required /><input defaultValue={addOn.description ?? ""} name="description" /><label><input defaultChecked={addOn.is_available} name="isAvailable" type="checkbox" /> Available</label><button className="status-button" type="submit">Save</button></form>)}</div>
    </section>
    <section className="admin-section"><div className="admin-section-heading"><div><p className="eyebrow">Official links</p><h2>Ordering channels</h2></div><span>{channels.length} total</span></div>
      <form action={saveOrderingChannel} className="admin-edit-form"><label>Label<input name="label" required /></label><label>Type<select defaultValue="delivery" name="type"><option value="delivery">Delivery</option><option value="social">Social</option><option value="direct">Direct</option><option value="other">Other</option></select></label><label>URL<input name="url" placeholder="https://" required type="url" /></label><label><input defaultChecked name="isActive" type="checkbox" /> Active</label><button className="button-primary" type="submit">Add channel</button></form>
      <div className="admin-category-list">{channels.map((channel) => <form action={saveOrderingChannel} key={channel.id}><input name="id" type="hidden" value={channel.id} /><input defaultValue={channel.label} name="label" required /><select defaultValue={channel.type} name="type"><option value="delivery">Delivery</option><option value="social">Social</option><option value="direct">Direct</option><option value="other">Other</option></select><input defaultValue={channel.url} name="url" required type="url" /><label><input defaultChecked={channel.is_active} name="isActive" type="checkbox" /> Active</label><button className="status-button" type="submit">Save</button></form>)}</div>
    </section>
  </>;
}
