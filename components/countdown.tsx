"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// ── Sunday May 10 2026, 11:59 PM IST ──────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-05-10T23:59:00+05:30");

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS  = { fontFamily: "'DM Sans', sans-serif" };

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
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownSection() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const isLaunched =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#0D0B09" }}
    >
      {/* Subtle red glow top-left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,84,26,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Subtle red glow bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(180,20,20,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Top border line */}
      <div className="h-[1px] w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-20 lg:py-28 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p
            className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ ...SANS, color: "#C4541A" }}
          >
            We&apos;re Live — Order Today
          </p>
          <h2
            className="text-[clamp(32px,5vw,62px)] font-medium leading-[1.1] text-white mb-5"
            style={SERIF}
          >
            Launch Offer<br />
            <em style={{ color: "#C4541A" }}>Ends Sunday.</em>
          </h2>
          <p
            className="text-[0.88rem] max-w-[420px] mx-auto leading-[1.8]"
            style={{ ...SANS, color: "rgba(255,255,255,0.4)" }}
          >
            Launch pricing ends tonight — grab it before the timer runs out.
          </p>
        </div>

        {/* ── Countdown Blocks ── */}
        <div className="grid grid-cols-4 gap-3 lg:gap-5 max-w-[560px] mx-auto mb-6">
          {[
            { label: "Days",    value: timeLeft.days },
            { label: "Hours",   value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex flex-col items-center">
              {/* Number block */}
              <div
                className="w-full aspect-square flex items-center justify-center rounded-xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: i === 3
                    ? "0 0 0 1px rgba(196,84,26,0.3), 0 0 24px rgba(196,84,26,0.15)"
                    : "none",
                }}
              >
                {/* Seconds get a pulsing red ring */}
                {i === 3 && (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      border: "1px solid rgba(196,84,26,0.5)",
                      animation: "pulse-ring 1s ease-in-out infinite",
                    }}
                  />
                )}
                <span
                  className="text-[clamp(28px,5vw,52px)] font-bold tabular-nums"
                  style={{ ...SERIF, color: i === 3 ? "#C4541A" : "#FFFFFF" }}
                >
                  {pad(value)}
                </span>
              </div>
              {/* Label */}
              <p
                className="text-[0.58rem] tracking-[0.2em] uppercase mt-2.5"
                style={{ ...SANS, color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Date pill ── */}
        <div className="flex justify-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(196,84,26,0.1)",
              border: "1px solid rgba(196,84,26,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#C4541A]"
              style={{ animation: "blink 1.2s ease-in-out infinite" }}
            />
            <p
              className="text-[0.65rem] tracking-[0.18em] uppercase"
              style={{ ...SANS, color: "rgba(255,255,255,0.5)" }}
            >
              {isLaunched
                ? "We are live now"
                : "Offer ends Sun, May 10 · 11:59 PM IST"}
            </p>
          </div>
        </div>

        {/* ── Price + CTA row ── */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* Price block */}
          <div className="text-center lg:text-left">
            <p
              className="text-[0.68rem] tracking-[0.16em] uppercase mb-2"
              style={{ ...SANS, color: "rgba(255,255,255,0.3)" }}
            >
              Launch Price
            </p>
            <div className="flex items-end gap-3 justify-center lg:justify-start">
              <span
                className="text-[clamp(36px,5vw,56px)] font-bold text-white leading-none"
                style={SERIF}
              >
                ₹399
              </span>
              <div className="flex flex-col pb-1">
                <span
                  className="text-base line-through leading-none"
                  style={{ ...SERIF, color: "rgba(255,255,255,0.25)" }}
                >
                  ₹599
                </span>
                <span
                  className="text-[0.65rem] font-bold tracking-wide mt-0.5"
                  style={{ ...SANS, color: "#C4541A" }}
                >
                  33% OFF
                </span>
              </div>
            </div>
            <p
              className="text-[0.7rem] mt-1"
              style={{ ...SANS, color: "rgba(255,255,255,0.25)" }}
            >
              ≈ ₹13 / day · 30 sachets
            </p>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block w-[1px] h-20"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => router.push("/productOverview")}
              className="group relative overflow-hidden px-10 py-4 rounded-xl text-white text-[0.75rem] font-semibold tracking-[0.18em] uppercase transition-all duration-300"
              style={{
                ...SANS,
                background: "#C4541A",
                boxShadow: "0 8px 32px rgba(196,84,26,0.35)",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "#B84216" }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                Order Now
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-300" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </span>
            </button>
            <p
              className="text-[0.62rem] tracking-wide"
              style={{ ...SANS, color: "rgba(255,255,255,0.2)" }}
            >
              🔒 Secure checkout · No hidden charges
            </p>
          </div>
        </div>

        {/* ── Bottom stats row ── */}
        <div
          className="mt-16 pt-8 grid grid-cols-3 gap-4 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { stat: "₹200", label: "You Save Per Pack" },
            { stat: "30", label: "Sachets Per Pack" },
            { stat: "7–10", label: "Days to Your Door" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p
                className="text-[clamp(22px,3vw,32px)] font-bold text-white mb-1"
                style={SERIF}
              >
                {stat}
              </p>
              <p
                className="text-[0.65rem] tracking-[0.12em] uppercase"
                style={{ ...SANS, color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom border */}
      <div className="h-[1px] w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

      <style jsx global>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.02); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}