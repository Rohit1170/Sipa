// ─── Freedom Sale — temporary campaign config ────────────────────────────────
// Single source of truth for the Freedom Sale campaign. Flip FREEDOM_SALE_ACTIVE
// to false to kill the campaign instantly regardless of dates, or just let it
// expire automatically at FREEDOM_SALE_END. Safe to delete this whole file (and
// its imports) once the campaign is retired — nothing else depends on it staying.

const FREEDOM_SALE_ACTIVE = true;

const FREEDOM_SALE_START = new Date("2026-08-01T00:00:00+05:30");
const FREEDOM_SALE_END = new Date("2026-08-16T00:00:00+05:30"); // exclusive — sale ends at midnight IST

export const FREEDOM_SALE_OFFER_LABEL = "BUY 1 GET 1 FREE";
export const FREEDOM_SALE_MESSAGE =
  "Freedom Sale is Live — Coupon codes are not valid at this moment.";

export function isFreedomSaleActive(now: Date = new Date()): boolean {
  if (!FREEDOM_SALE_ACTIVE) return false;
  return now >= FREEDOM_SALE_START && now < FREEDOM_SALE_END;
}

export interface FreedomSalePricing {
  /** What the shipped quantity would normally cost — shown crossed out. */
  mrp: number;
  discountAmount: number;
  /** What the customer actually pays — for `paidQuantity` packs. */
  finalPrice: number;
  /** Packs actually shipped: always exactly double what was paid for. */
  shippedQuantity: number;
}

// Buy 1 Get 1 Free: customer pays only for `paidQuantity` packs but always
// receives double that amount — no half-price rounding, no odd-quantity edge case.
export function applyFreedomSalePricing(paidQuantity: number, mrpPerUnit: number): FreedomSalePricing {
  const shippedQuantity = paidQuantity * 2;
  const finalPrice = mrpPerUnit * paidQuantity;
  const mrp = mrpPerUnit * shippedQuantity;
  const discountAmount = mrp - finalPrice;
  return { mrp, discountAmount, finalPrice, shippedQuantity };
}
