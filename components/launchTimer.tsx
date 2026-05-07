"use client";

import { useEffect, useState } from "react";

// ── Sunday May 10 2026, 6:00 AM IST ──────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-05-10T06:00:00+05:30");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

export default function LaunchCountdownPopup() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  // Show once per session
  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem("launch_popup_dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // Live countdown
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("launch_popup_dismissed", "true");
  };

  if (!mounted || !visible) return null;

  const isLaunched =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.3s ease" }}
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        className="fixed z-[101] left-1/2 top-1/2 w-full max-w-md px-4"
        style={{
          transform: "translate(-50%, -50%)",
          animation: "popupIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-black/10"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}
        >
          {/* Top accent */}
          <div className="h-1 bg-[#C4541A]" />

          <div className="px-8 pt-8 pb-7 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/8 hover:bg-black/15 flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                <path
                  d="M2 2l8 8M10 2l-8 8"
                  stroke="#1C1A17"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Label */}
            <p
              className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3"
              style={SANS}
            >
              {isLaunched ? "🎉 We're Live!" : "⏳ Launching Sunday"}
            </p>

            {/* Headline */}
            <h2
              className="text-[26px] font-medium text-[#1C1A17] leading-[1.2] mb-2"
              style={SERIF}
            >
              {isLaunched ? (
                <>
                  India's First
                  <br />
                  <em className="text-[#C4541A]">Daily D3+K2 Sachet</em> is
                  Live.
                </>
              ) : (
                <>
                  India's First
                  <br />
                  <em className="text-[#C4541A]">Daily Vitamin Sachet</em>
                  <br />
                  drops in...
                </>
              )}
            </h2>

            <p
              className="text-[0.78rem] text-[#9A8E82] leading-relaxed mb-6"
              style={SANS}
            >
              {isLaunched
                ? "Pre-launch price of ₹359 is live. Grab your spot before it's gone."
                : "Pre-launch price ₹359 vs MRP ₹599 — only for the first batch."}
            </p>

            {/* ── COUNTDOWN BLOCKS ── */}
            {!isLaunched && (
              <>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-xl py-4"
                      style={{
                        background: "rgba(28, 26, 23, 0.08)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(28, 26, 23, 0.12)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.06)",
                      }}
                    >
                      <span
                        className="text-[2rem] font-bold text-gray-500 leading-none tabular-nums"
                        style={SERIF}
                      >
                        {pad(value)}
                      </span>
                      <span
                        className="text-[0.55rem] tracking-[0.18em] uppercase text-[#9A8E82] mt-1.5"
                        style={SANS}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Date line */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] flex-1 bg-black/10" />
                  <p
                    className="text-[0.62rem] text-[#9A8E82] tracking-widest uppercase px-2 py-1 rounded-full"
                    style={{
                      ...SANS,
                      background: "rgba(196, 84, 26, 0.08)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(196, 84, 26, 0.15)",
                    }}
                  >
                    Sun, May 10 · 6:00 AM IST
                  </p>
                  <div className="h-[1px] flex-1 bg-black/10" />
                </div>
              </>
            )}

            {/* CTA */}
            <button
              onClick={handleClose}
              className="w-full py-4 bg-[#C4541A] hover:bg-[#D96528] text-white text-[0.72rem] font-semibold tracking-[0.18em] uppercase rounded-xl transition-colors"
              style={SANS}
            >
              {isLaunched ?  "Pre-Book Now →" : "Claim Early Bird Price — ₹359 →"}
            </button>

            {/* Trust line */}
            <p
              className="text-center text-[0.62rem] text-[#9A8E82] mt-3 tracking-wide"
              style={SANS}
            >
              🔒 No spam · Pre-launch price ends at launch
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.93);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}
