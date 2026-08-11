import { NextRequest, NextResponse } from "next/server";
import { calculatePricing, findValidCoupon } from "@/app/lib/coupon";
import { isFreedomSaleActive, FREEDOM_SALE_MESSAGE } from "@/app/lib/campaign";

interface ApplyCouponBody {
  promoCode?: string;
  productId?: string;
  quantity?: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { promoCode, quantity = 1 }: ApplyCouponBody = await req.json();

    if (isFreedomSaleActive()) {
      return NextResponse.json(
        { success: false, reason: "sale_active", message: FREEDOM_SALE_MESSAGE },
        { status: 400 }
      );
    }

    if (!promoCode || !promoCode.trim()) {
      return NextResponse.json(
        { success: false, reason: "not_found", message: "Enter a promo code." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { success: false, reason: "not_found", message: "Invalid quantity." },
        { status: 400 }
      );
    }

    const result = await findValidCoupon(promoCode);

    if (!result.ok) {
      const messages: Record<string, string> = {
        not_found: "Invalid promo code.",
        inactive: "This promo code is no longer active.",
        expired: "This promo code has expired.",
        limit_reached: "This promo code has reached its usage limit.",
      };
      return NextResponse.json(
        { success: false, reason: result.reason, message: messages[result.reason] },
        { status: 400 }
      );
    }

    const pricing = calculatePricing(quantity, result.coupon);

    return NextResponse.json({
      success: true,
      coupon: {
        code: result.coupon.code,
        discountType: result.coupon.discountType,
        discountValue: result.coupon.discountValue,
      },
      pricing,
    });
  } catch (err) {
    console.error("coupon/apply error:", err);
    return NextResponse.json(
      { success: false, reason: "not_found", message: "Could not validate coupon. Please try again." },
      { status: 500 }
    );
  }
}
