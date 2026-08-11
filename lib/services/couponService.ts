export type CouponDiscountType = "percentage" | "flat";

export interface CouponSummary {
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
}

export interface PricingBreakdown {
  mrp: number;
  discountAmount: number;
  finalPrice: number;
}

export type CouponRejectReason = "not_found" | "inactive" | "expired" | "limit_reached" | "sale_active";

export interface ApplyCouponSuccess {
  success: true;
  coupon: CouponSummary;
  pricing: PricingBreakdown;
}

export interface ApplyCouponFailure {
  success: false;
  reason: CouponRejectReason;
  message: string;
}

export type ApplyCouponResult = ApplyCouponSuccess | ApplyCouponFailure;

interface ApplyCouponParams {
  promoCode: string;
  productId?: string;
  quantity: number;
}

export async function applyCoupon(params: ApplyCouponParams): Promise<ApplyCouponResult> {
  try {
    const res = await fetch("/api/coupon/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = (await res.json()) as ApplyCouponResult;
    return data;
  } catch {
    return {
      success: false,
      reason: "not_found",
      message: "Network error — please try again.",
    };
  }
}
