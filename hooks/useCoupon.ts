"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  applyCoupon,
  type CouponSummary,
  type PricingBreakdown,
} from "@/lib/services/couponService";
import { isFreedomSaleActive, FREEDOM_SALE_MESSAGE } from "@/app/lib/campaign";

export type CouponStatus =
  | "idle"
  | "validating"
  | "applied"
  | "invalid"
  | "expired"
  | "limit_reached"
  | "inactive"
  | "sale_active";

interface UseCouponOptions {
  productId?: string;
  quantity: number;
  /** Fires exactly once, the first time a coupon is successfully applied (manual or via URL). */
  onApplied?: () => void;
}

interface UseCouponResult {
  code: string;
  setCode: (code: string) => void;
  status: CouponStatus;
  message: string | null;
  coupon: CouponSummary | null;
  pricing: PricingBreakdown | null;
  apply: (codeOverride?: string) => Promise<void>;
  remove: () => void;
}

export function useCoupon({ productId, quantity, onApplied }: UseCouponOptions): UseCouponResult {
  const searchParams = useSearchParams();

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<CouponStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [coupon, setCoupon] = useState<CouponSummary | null>(null);
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);

  const hasAutoApplied = useRef(false);
  const hasFiredConfetti = useRef(false);
  const requestSeq = useRef(0);

  const runApply = useCallback(
    async (codeToApply: string, qty: number, silent = false) => {
      if (!codeToApply.trim()) return;

      const seq = ++requestSeq.current;
      if (!silent) setStatus("validating");
      setMessage(null);

      const result = await applyCoupon({ promoCode: codeToApply, productId, quantity: qty });

      if (seq !== requestSeq.current) return; // superseded by a newer request/remove()

      if (result.success) {
        setStatus("applied");
        setCoupon(result.coupon);
        setPricing(result.pricing);
        setMessage(null);
        if (!hasFiredConfetti.current) {
          hasFiredConfetti.current = true;
          onApplied?.();
        }
      } else {
        setStatus(result.reason === "not_found" ? "invalid" : result.reason);
        setCoupon(null);
        setPricing(null);
        setMessage(result.message);
      }
    },
    [productId, onApplied]
  );

  const apply = useCallback(
    async (codeOverride?: string) => {
      const target = (codeOverride ?? code).trim();
      setCode(target);
      if (isFreedomSaleActive()) {
        setStatus("sale_active");
        setMessage(FREEDOM_SALE_MESSAGE);
        return;
      }
      await runApply(target, quantity);
    },
    [code, quantity, runApply]
  );

  const remove = useCallback(() => {
    requestSeq.current++; // invalidate any in-flight request
    setStatus("idle");
    setCoupon(null);
    setPricing(null);
    setMessage(null);
    setCode("");
  }, []);

  // ── Auto-apply from ?promo=CODE on first mount ──
  useEffect(() => {
    if (hasAutoApplied.current) return;
    if (isFreedomSaleActive()) return; // promo URLs are ignored during the Freedom Sale
    const promo = searchParams.get("promo");
    if (promo && promo.trim()) {
      hasAutoApplied.current = true;
      setCode(promo);
      runApply(promo, quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ── Quantity changes while a coupon is active — silently refresh backend-computed pricing ──
  useEffect(() => {
    if (status !== "applied" || !coupon) return;
    const timer = setTimeout(() => {
      runApply(coupon.code, quantity, true);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return { code, setCode, status, message, coupon, pricing, apply, remove };
}
