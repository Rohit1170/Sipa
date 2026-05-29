"use client";
import { signIn } from "next-auth/react";

const SANS  = { fontFamily: "'DM Sans', sans-serif" };
const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthGateModal({ isOpen, onClose }: AuthGateModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,8,5,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-sm border border-black/10 p-8 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#C4541A] mb-2" style={SANS}>
          Sign in required
        </p>
        <h3 className="text-xl font-semibold text-[#1C1A17] mb-2 leading-snug" style={SERIF}>
          Log in to leave a review
        </h3>
        <p className="text-[0.83rem] text-[#5A5245] leading-relaxed mb-6" style={SANS}>
          Please sign in or create an account to share your experience with SIPA Nutrition.
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/productOverview#reviews" })}
            className="w-full py-3 bg-[#1C1A17] hover:bg-[#C4541A] text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors duration-300"
            style={SANS}
          >
            Sign In / Register →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
            style={SANS}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
