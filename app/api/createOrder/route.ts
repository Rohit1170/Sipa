import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { MRP_PER_UNIT, calculatePricing, findValidCoupon } from "@/app/lib/coupon";
import { isFreedomSaleActive, applyFreedomSalePricing } from "@/app/lib/campaign";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ─── Toggle this to switch between test (₹1) and production (MRP) ───────────
const IS_TEST_MODE = false;

const PRICE_PER_UNIT = IS_TEST_MODE ? 100 : MRP_PER_UNIT * 100; // 100 paise = ₹1 | MRP in paise

interface CreateOrderBody {
  quantity?: number;
  promoCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { quantity = 1, promoCode }: CreateOrderBody = await req.json();

    if (!quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity." },
        { status: 400 }
      );
    }

    // ── Re-validate the coupon/sale server-side — never trust client-sent pricing ──
    let discountAmount = 0;
    let appliedCode = "";
    let packQuantity = quantity; // packs actually shipped — doubles during the Freedom Sale
    const freedomSaleActive = isFreedomSaleActive();

    if (!IS_TEST_MODE && freedomSaleActive) {
      // Freedom Sale (Buy 1 Get 1 Free) is live — coupons are disabled and never stack with it.
      // Price paid is unchanged; the bonus is entirely in the extra packs shipped.
      const bogo = applyFreedomSalePricing(quantity, MRP_PER_UNIT);
      packQuantity = bogo.shippedQuantity;
      discountAmount = bogo.discountAmount; // informational (order record/email) — not deducted from amount
    } else if (!IS_TEST_MODE && promoCode && promoCode.trim()) {
      const result = await findValidCoupon(promoCode);
      if (!result.ok) {
        return NextResponse.json(
          { success: false, message: "Promo code is no longer valid." },
          { status: 400 }
        );
      }
      const pricing = calculatePricing(quantity, result.coupon);
      discountAmount = pricing.discountAmount;
      appliedCode = result.coupon.code;
    }

    const amount = IS_TEST_MODE
      ? quantity * PRICE_PER_UNIT
      : freedomSaleActive
      ? quantity * PRICE_PER_UNIT // Freedom Sale never discounts cash — only ships more packs
      : quantity * PRICE_PER_UNIT - discountAmount * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        promoCode: appliedCode,
        discountAmount: String(discountAmount),
        quantity: String(quantity),
        packQuantity: String(packQuantity),
        freedomSale: String(freedomSaleActive),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      isTestMode: IS_TEST_MODE,
      pricing: {
        mrp: quantity * MRP_PER_UNIT,
        discountAmount,
        finalPrice: freedomSaleActive ? quantity * MRP_PER_UNIT : quantity * MRP_PER_UNIT - discountAmount,
        packQuantity,
      },
    });
  } catch (err: any) {
    console.error("createOrder error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}