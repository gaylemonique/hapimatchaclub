"use client";

import { useState } from "react";
import { DELIVERY_NOTE, DIRECT_ORDER_URL, ORDER_URL, peso, type Size } from "@/lib/menu";

/**
 * Size choice plus the order call to action. Ordering happens off-site, so the
 * buttons are links out rather than anything resembling a checkout.
 */
export function SizePicker({ sizes }: { sizes: Size[] }) {
  const [active, setActive] = useState(0);
  const size = sizes[active];

  return (
    <>
      {sizes.length > 1 && (
        <>
          <h2 className="eyebrow">Size</h2>
          <div className="size-options">
            {sizes.map((option, index) => (
              <button
                aria-pressed={index === active}
                className="size-option"
                key={option.label}
                onClick={() => setActive(index)}
                type="button"
              >
                <span className="size-name">{option.label}</span>
                <span className="size-price">{peso(option.price)}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="price-block">
        <span className="price-now">{peso(size.price)}</span>
        {sizes.length === 1 && <span className="card-size">{size.label}</span>}
      </div>

      <div className="order-bar">
        <a
          className="btn btn-primary btn-block"
          href={DIRECT_ORDER_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Order direct · {peso(size.price)}
        </a>
        <a
          className="btn btn-quiet btn-block"
          href={ORDER_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          or order on foodpanda ↗
        </a>
        <p className="notice notice-center">{DELIVERY_NOTE}</p>
      </div>
    </>
  );
}
