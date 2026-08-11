"use client";

import type { CouponStatus } from "@/hooks/useCoupon";

const SANS = { fontFamily: "'DM Sans', sans-serif" };

interface PromoCodeInputProps {
  code: string;
  setCode: (code: string) => void;
  status: CouponStatus;
  message: string | null;
  onApply: () => void;
  onRemove: () => void;
  /** When true (Freedom Sale live), the input is shown disabled/blurred and coupon entry is blocked. */
  saleActive?: boolean;
}

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

export function PromoCodeInput({ code, setCode, status, message, onApply, onRemove, saleActive = false }: PromoCodeInputProps) {
  const isValidating = status === "validating";
  const isApplied = status === "applied";
  const isErrorState = status === "invalid" || status === "expired" || status === "limit_reached" || status === "inactive";

  if (saleActive) {
    return (
      <div className="mb-6">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#5A5245] mb-2" style={SANS}>
          Promo Code
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value=""
            disabled
            readOnly
            placeholder="Enter Promo Code"
            className="input rounded-sm flex-1 blur-[1.5px] opacity-50 cursor-not-allowed select-none"
            style={SANS}
            tabIndex={-1}
            aria-disabled="true"
          />
          <button
            disabled
            className="px-6 py-3 rounded-sm bg-[#C4541A] opacity-40 cursor-not-allowed text-white text-[0.75rem] font-semibold tracking-[0.1em] uppercase"
            style={SANS}
            tabIndex={-1}
          >
            Apply
          </button>
        </div>
        <p className="text-[10px] text-[#C4541A] font-semibold mt-1.5 ml-0.5" style={SANS}>
          🎉 Freedom Sale is Live — Coupon codes are not valid at this moment.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#5A5245] mb-2" style={SANS}>
        Promo Code
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isApplied && !isValidating) onApply();
          }}
          readOnly={isApplied}
          placeholder="Enter Promo Code"
          className={`input rounded-sm flex-1 ${isApplied ? "bg-[#F5F0E8] text-[#1C6B3A] font-semibold" : ""} ${
            isErrorState ? "border-red-400 focus:border-red-400" : ""
          }`}
          style={SANS}
        />
        {isApplied ? (
          <button
            onClick={onRemove}
            className="px-5 py-3 rounded-sm border border-black/20 text-[#5A5245] text-[0.75rem] font-semibold tracking-[0.1em] uppercase hover:bg-black/5 transition-colors"
            style={SANS}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={onApply}
            disabled={isValidating || !code.trim()}
            className="px-6 py-3 rounded-sm bg-[#C4541A] hover:bg-[#D96528] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[0.75rem] font-semibold tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 min-w-[110px]"
            style={SANS}
          >
            {isValidating ? <Spinner /> : "Apply"}
          </button>
        )}
      </div>

      {isValidating && (
        <p className="text-[10px] text-[#9A8E82] mt-1.5 ml-0.5" style={SANS}>Applying coupon...</p>
      )}
      {isApplied && (
        <p className="text-[10px] text-[#1C6B3A] font-semibold mt-1.5 ml-0.5" style={SANS}>
          ✓ Coupon Applied Successfully
        </p>
      )}
      {isErrorState && message && (
        <p className="text-[10px] text-red-500 mt-1.5 ml-0.5" style={SANS}>{message}</p>
      )}
    </div>
  );
}
