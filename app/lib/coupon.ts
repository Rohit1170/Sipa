import { connectDB } from "@/app/lib/db";
import Coupon from "@/app/models/coupon";

export const MRP_PER_UNIT = 599;

export type CouponDiscountType = "percentage" | "flat";

export interface CouponDoc {
  _id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  isActive: boolean;
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
}

export type CouponRejectReason =
  | "not_found"
  | "inactive"
  | "expired"
  | "limit_reached";

export type FindCouponResult =
  | { ok: true; coupon: CouponDoc }
  | { ok: false; reason: CouponRejectReason };

export interface PricingBreakdown {
  mrp: number;
  discountAmount: number;
  finalPrice: number;
}

export async function findValidCoupon(code: string): Promise<FindCouponResult> {
  await connectDB();

  const normalized = code.trim().toUpperCase();
  const coupon = (await Coupon.findOne({ code: normalized }).lean()) as CouponDoc | null;

  if (!coupon) return { ok: false, reason: "not_found" };
  if (!coupon.isActive) return { ok: false, reason: "inactive" };
  if (new Date(coupon.expiryDate).getTime() < Date.now()) {
    return { ok: false, reason: "expired" };
  }
  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    return { ok: false, reason: "limit_reached" };
  }

  return { ok: true, coupon };
}

export function calculatePricing(
  quantity: number,
  coupon: CouponDoc | null
): PricingBreakdown {
  const mrp = MRP_PER_UNIT * quantity;

  if (!coupon) {
    return { mrp, discountAmount: 0, finalPrice: mrp };
  }

  const rawDiscount =
    coupon.discountType === "percentage"
      ? (mrp * coupon.discountValue) / 100
      : coupon.discountValue * quantity;

  const discountAmount = Math.min(Math.max(Math.round(rawDiscount), 0), mrp);
  const finalPrice = mrp - discountAmount;

  return { mrp, discountAmount, finalPrice };
}
