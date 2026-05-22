import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  robots: { index: false, follow: false },
};

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

export default function VerifyPage() {
  return (
    <div
      className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6"
      style={SANS}
    >
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#C4541A]/10 flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              stroke="#C4541A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3"
          style={SANS}
        >
          Check Your Inbox
        </p>
        <h1
          className="text-[28px] font-medium italic text-[#1C1A17] mb-4"
          style={SERIF}
        >
          Link Sent.
        </h1>
        <p className="text-[0.85rem] text-[#5A5245] leading-relaxed">
          We&apos;ve emailed you a secure sign-in link. Click it to verify and
          continue to your order.
        </p>
        <p className="text-[0.72rem] text-[#9A8E82] mt-6">
          Didn&apos;t get it? Check your spam folder.
        </p>
      </div>
    </div>
  );
}
