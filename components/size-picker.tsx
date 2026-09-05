"use client";

import { useState } from "react";
import { DIRECT_ORDER_URL, ORDER_URL, peso, type Size } from "@/lib/menu";

/**
 * Size choice plus the order call to action. Ordering happens off-site, so the
 * button is a link out rather than anything resembling a checkout.
 */
export function SizePicker({
  children,
  sizes,
  soldOut,
}: {
  /** Detail panels, rendered between the size choice and the sticky order bar. */
  children?: React.ReactNode;
  sizes: Size[];
  soldOut?: boolean;
}) {
  const [active, setActive] = useState(0);
  const price = peso(sizes[active].price);

  return (
    <>
      <h2 className="eyebrow">Size</h2>
      <div className="size-options">
        {sizes.map((size, index) => (
          <button
            aria-pressed={index === active}
            className="size-option"
            key={size.label}
            onClick={() => setActive(index)}
            type="button"
          >
            <span className="size-name">{size.label}</span>
            <span className="size-price">{peso(size.price)}</span>
          </button>
        ))}
      </div>

      {children}

      <div className="order-bar">
        {soldOut ? (
          <p className="soldout-note">
            Sold out today. Check the ordering pages or message us — it usually comes back the next
            service day.
          </p>
        ) : null}
        <a
          className="btn btn-primary btn-block"
          href={DIRECT_ORDER_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Order direct · {price}
        </a>
        <a
          className="btn btn-quiet btn-block"
          href={ORDER_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          or order on foodpanda ↗
        </a>
      </div>
    </>
  );
}
