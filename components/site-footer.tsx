import { ADDRESS, AVAILABILITY, DIRECT_ORDER_URL, INSTAGRAM_URL, ORDER_URL } from "@/lib/menu";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-name">Hapi Matcha Club</p>
        <p className="footer-lines">
          A home-based matcha bar serving handcrafted matcha drinks
          <br />
          {ADDRESS}
          <br />
          {AVAILABILITY}
        </p>
        <div className="footer-links">
          <a href={INSTAGRAM_URL} rel="noopener noreferrer" target="_blank">
            Instagram
          </a>
          <a href={DIRECT_ORDER_URL} rel="noopener noreferrer" target="_blank">
            Order direct
          </a>
          <a href={ORDER_URL} rel="noopener noreferrer" target="_blank">
            foodpanda
          </a>
        </div>
      </div>
    </footer>
  );
}
