"use client";

import type { CouponSummary, PricingBreakdown as PricingBreakdownData } from "@/lib/services/couponService";

const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

// Mirrors app/lib/coupon.ts MRP_PER_UNIT — display only, never used for payable-amount math.
const MRP_PER_UNIT = 599;

interface FreedomSalePricing {
  mrp: number;
  discountAmount: number;
  finalPrice: number;
  shippedQuantity: number;
}

interface PricingBreakdownProps {
  quantity: number;
  coupon: CouponSummary | null;
  pricing: PricingBreakdownData | null;
  /** When set (Freedom Sale live), takes priority over coupon pricing — coupons never stack with it. */
  freedomSale?: FreedomSalePricing | null;
}

export function PricingBreakdown({ quantity, coupon, pricing, freedomSale }: PricingBreakdownProps) {
  if (freedomSale) {
    return (
      <div className="mb-7 bg-[#F5F0E8] rounded-sm px-5 py-4 border border-[#C4541A]/30">
        <div className="flex justify-between items-center py-1">
          <span className="text-[0.78rem] text-[#5A5245]" style={SANS}>MRP</span>
          <span className="text-[0.85rem] text-[#5A5245] line-through" style={SANS}>₹{freedomSale.mrp}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-[0.78rem] text-[#C4541A] font-bold uppercase tracking-wide" style={SANS}>Freedom Sale — Buy 1 Get 1 Free</span>
          <span className="text-[0.85rem] text-[#C4541A] font-medium" style={SANS}>−₹{freedomSale.discountAmount}</span>
        </div>
        <div className="h-[1px] bg-black/10 my-2" />
        <div className="flex justify-between items-center py-1">
          <span className="text-[0.85rem] font-bold uppercase tracking-wide text-[#1C1A17]" style={SANS}>Final Price</span>
          <span className="text-[1.6rem] font-bold text-[#1C1A17]" style={SERIF}>₹{freedomSale.finalPrice}</span>
        </div>
        {freedomSale.discountAmount > 0 && (
          <p className="text-[0.75rem] font-semibold text-[#C4541A] mt-1" style={SANS}>
            🎉 You'll receive {freedomSale.shippedQuantity} packs — you saved ₹{freedomSale.discountAmount}
          </p>
        )}
      </div>
    );
  }

  if (!pricing || !coupon) {
    return (
      <div className="flex flex-col gap-2 mb-7">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-[#1C1A17] tracking-tight" style={SERIF}>
            ₹{MRP_PER_UNIT * quantity}
          </span>
        </div>
        <p className="text-[0.7rem] text-gray-600" style={SANS}>
          <span className="font-bold">≈ ₹{Math.round((MRP_PER_UNIT * quantity) / 30)} / day </span>· 30-day supply
        </p>
      </div>
    );
  }

  return (
    <div className="mb-7 bg-[#F5F0E8] rounded-sm px-5 py-4">
      <div className="flex justify-between items-center py-1">
        <span className="text-[0.78rem] text-[#5A5245]" style={SANS}>MRP</span>
        <span className="text-[0.85rem] text-[#5A5245]" style={SANS}>₹{pricing.mrp}</span>
      </div>
      <div className="flex justify-between items-center py-1">
        <span className="text-[0.78rem] text-[#1C6B3A] font-medium" style={SANS}>Promo ({coupon.code})</span>
        <span className="text-[0.85rem] text-[#1C6B3A] font-medium" style={SANS}>−₹{pricing.discountAmount}</span>
      </div>
      <div className="h-[1px] bg-black/10 my-2" />
      <div className="flex justify-between items-center py-1">
        <span className="text-[0.85rem] font-bold uppercase tracking-wide text-[#1C1A17]" style={SANS}>Final Price</span>
        <span className="text-[1.6rem] font-bold text-[#1C1A17]" style={SERIF}>₹{pricing.finalPrice}</span>
      </div>
      {pricing.discountAmount > 0 && (
        <p className="text-[0.75rem] font-semibold text-[#C4541A] mt-1" style={SANS}>
          🎉 You saved ₹{pricing.discountAmount} today
        </p>
      )}
    </div>
  );
}
