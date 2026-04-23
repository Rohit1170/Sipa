"use client";

import { useEffect, useState, useRef } from "react";
type ErrorType = { name?: string; email?: string; phone?: string };
type NotifyModalProps = {
  onClose: () => void;
};

function NotifyModal({ onClose }: NotifyModalProps) {
  const [step, setStep] = useState("form");
 
  const [errors, setErrors] = useState<ErrorType>({});
  const [focused, setFocused] = useState<"name" | "email" | "phone" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const validate = () => {
  const e: ErrorType = {};

  if (!fields.name.trim()) e.name = "We'd love to know your name.";
  if (!fields.email.trim()) e.email = "Your email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    e.email = "That doesn't look like a valid email.";

  if (fields.phone && !/^\+?[\d\s\-()]{7,15}$/.test(fields.phone))
    e.phone = "Check your number format.";

  return e;
};

  const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  try {
    setSubmitting(true);

    const res = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setStep("success");
  } catch (err: any) {
    alert(err.message);
  } finally {
    setSubmitting(false);
  }
};

  const handleOverlayClick = (ev: React.MouseEvent<HTMLDivElement>) => {
  if (ev.target === overlayRef.current) onClose();
};
  type FieldType = {
  name: string;
  email: string;
  phone: string;
};


const [fields, setFields] = useState<FieldType>({
  name: "",
  email: "",
  phone: "",
});


  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(15,10,5,0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        .modal-card { animation: slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        .success-icon { animation: popIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .field-input {
          width:100%;
          background:rgba(255,255,255,0.03);
          border:1.5px solid rgba(200,180,160,0.18);
          border-radius:10px;
          padding:14px 16px;
          color:#1a1209;
          font-size:15px;
          outline:none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family:'DM Sans', sans-serif;
        }
        .field-input::placeholder { color:#b0a090; }
        .field-input:focus {
          border-color:#c2410c;
          background:rgba(194,65,12,0.04);
          box-shadow:0 0 0 3px rgba(194,65,12,0.10);
        }
        .field-input.error-state { border-color:#e05c3a; box-shadow:0 0 0 3px rgba(224,92,58,0.12); }
        .shimmer-btn {
          background: linear-gradient(90deg, #1a1209 35%, #3d1e0a 50%, #1a1209 65%);
          background-size: 200% auto;
        }
        .shimmer-btn:not(:disabled):hover {
          animation: shimmer 1.4s linear infinite;
        }
      `}</style>

      <div
        className="modal-card relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#f7f4ef", border: "1px solid rgba(194,65,12,0.15)" }}
      >
        {/* Decorative top strip */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #7c2d12, #c2410c, #ea580c, #c2410c, #7c2d12)" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-all"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-8 pt-8 pb-9">
          {step === "form" ? (
            <>
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold"
                    style={{ background: "rgba(194,65,12,0.10)", color: "#c2410c", fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse inline-block" />
                    Launching Soon
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 leading-tight mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Be the <em className="italic text-orange-700">First to Know.</em>
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  SIPA Nutrition is almost here. Drop your details and we'll notify you the moment it launches — with an exclusive early-bird offer.
                </p>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={fields.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={e => { setFields(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                    className={`field-input ${errors.name ? "error-state" : ""}`}
                  />
                  {errors.name && <p className="text-xs text-orange-700 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={fields.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={e => { setFields(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                    className={`field-input ${errors.email ? "error-state" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-orange-700 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
                </div>

                {/* Phone — optional */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Phone Number
                    <span className="ml-2 normal-case tracking-normal text-neutral-300">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={fields.phone}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    onChange={e => { setFields(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })); }}
                    className={`field-input ${errors.phone ? "error-state" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-orange-700 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{errors.phone}</p>}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="shimmer-btn mt-7 w-full py-4 rounded-xl text-white text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 transition-opacity disabled:opacity-70"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                      <path d="M14 8a6 6 0 00-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Saving your spot…
                  </>
                ) : (
                  <>
                    Notify Me at Launch
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-neutral-400 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          ) : (
            /* Success state */
            <div className="flex flex-col items-center text-center py-4">
              <div className="success-icon w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, #fff7ed, #fed7aa)" }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="rgba(194,65,12,0.10)"/>
                  <path d="M10 18.5l5.5 5.5 10.5-11" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                You're on the list,{" "}
                <em className="italic text-orange-700">{fields.name.split(" ")[0]}!</em>
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We'll reach out to <strong className="text-neutral-700">{fields.email}</strong> the moment SIPA Nutrition launches — along with your exclusive early-bird discount.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-neutral-300 text-neutral-600 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-100 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Close
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-neutral-900 text-white text-sm uppercase tracking-widest font-semibold hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    fetch("/api/warmup");
  }, []);


  return (
    <>
      <section className="pt-16 py-0 lg:py-8 px-0 sm:px-6 relative min-h-screen flex flex-col bg-[#f7f4ef] overflow-hidden">
        {/* Top bar */}
        <div
          className={`flex items-center justify-between px-6 sm:px-10 pt-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Daily Vitamin D3 + K2
          </p>
          <div className="h-px bg-neutral-300 flex-1 mx-6" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Est. 2026
          </p>
        </div>

        {/* Brand name */}
        <div
          className={`px-6 sm:px-8 pt-4 pb-2 transition-all duration-1000 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className="text-[10vw] sm:text-[6vw] lg:text-[6vw] font-bold text-neutral-900 leading-[0.9] uppercase tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SIPA
            <em className="italic text-orange-700 ml-4 sm:ml-6">Nutrition</em>
          </h1>
        </div>

        {/* Hairline rule */}
        <div
          className={`mx-6 sm:mx-10 h-px bg-neutral-300 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full py-8">

            {/* ── DESKTOP layout ── */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 items-center">
              {/* Desktop LEFT */}
              <div
                className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p
                  className="text-3xl sm:text-4xl font-bold text-neutral-700 leading-snug mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Let's Get{" "}
                  <em className="italic text-orange-700">Better Together.</em>
                </p>
                <p
                  className="text-base text-neutral-500 max-w-md leading-relaxed mb-8"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  A vegan daily maintenance formula engineered for optimal
                  absorption, modern lifestyles, and lasting wellness.
                </p>
                <div className="h-px bg-neutral-300 mb-8 max-w-md" />
                <div className="flex flex-wrap items-center gap-8 mb-10">
                  <div>
                    <p
                      className="text-5xl font-bold text-neutral-900"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₹599
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest text-neutral-400 mt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ≈ ₹19.9 / day
                    </p>
                  </div>
                  <div
                    className="flex flex-col gap-1.5 text-sm text-neutral-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      Clinically dosed
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />
                      100% Vegan
                    </span>
                    {/* <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      No prescription needed
                    </span> */}
                  </div>
                </div>

                {/* Notify Me Button — Desktop */}
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative px-10 py-4 rounded-xl bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-semibold overflow-hidden"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {/* animated background on hover */}
                  <span className="absolute inset-0 bg-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative flex items-center gap-3 transition-colors duration-300">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                      <path d="M7.5 1a4.5 4.5 0 014.5 4.5c0 2.5.8 3.7 1.5 4.5H1.5C2.2 9.2 3 8 3 5.5A4.5 4.5 0 017.5 1zM6 10h3a1.5 1.5 0 01-3 0z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    Notify Me
                  </span>
                </button>
              </div>

              {/* Desktop RIGHT — image */}
              <div
                className={`transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="relative max-w-md mx-auto">
                  <div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at 60% 40%, rgba(194,65,12,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute top-6 right-6 w-32 h-32 rounded-full border border-neutral-200 opacity-60" />
                  <div className="absolute bottom-10 left-4 w-16 h-16 rounded-full border border-orange-200 opacity-80" />
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/hero.jpeg"
                      alt="SIPA Nutrition Vitamin D3 K2 Sachets"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div
                    className={`absolute -top-4 -right-4 bg-orange-700 text-white px-4 py-2 shadow-sm transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      30 Sachets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MOBILE layout ── */}
            <div className="flex flex-col gap-8 lg:hidden">
              {/* 1. Description */}
              <div
                className={`transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p
                  className="text-2xl font-bold text-neutral-700 leading-snug mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Let's Get{" "}
                  <em className="italic text-orange-700">Better Together.</em>
                </p>
                <p
                  className="text-sm text-neutral-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  A vegan daily maintenance formula engineered for optimal
                  absorption, modern lifestyles, and lasting wellness.
                </p>
              </div>

              {/* 2. Image */}
              <div
                className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="relative max-w-sm mx-auto">
                  <div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at 60% 40%, rgba(194,65,12,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/hero.jpeg"
                      alt="SIPA Nutrition Vitamin D3 K2 Sachets"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div
                    className={`absolute -top-4 -right-4 bg-orange-700 text-white px-3 py-1.5 shadow-sm transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <p
                      className="text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      30 Sachets
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Price + trust + CTA */}
              <div
                className={`transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="h-px bg-neutral-300 mb-6" />
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div>
                    <p
                      className="text-3xl font-bold text-neutral-900"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₹599
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest text-neutral-400 mt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ≈ ₹19.9 / day
                    </p>
                  </div>
                  <div
                    className="flex flex-col gap-1.5 text-sm text-neutral-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      Clinically dosed
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />
                      100% Vegan
                    </span>
                    {/* <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                      No prescription needed
                    </span> */}
                  </div>
                </div>

                {/* Notify Me Button — Mobile */}
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative w-full py-4 bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-semibold overflow-hidden rounded-xl flex items-center justify-center gap-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="absolute inset-0 bg-orange-700 translate-y-full group-active:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative flex items-center gap-3">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M7.5 1a4.5 4.5 0 014.5 4.5c0 2.5.8 3.7 1.5 4.5H1.5C2.2 9.2 3 8 3 5.5A4.5 4.5 0 017.5 1zM6 10h3a1.5 1.5 0 01-3 0z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    Notify Me at Launch
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className={`flex items-center gap-6 px-6 sm:px-10 pb-6 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-px bg-neutral-300 flex-1" />
          <p
            className="text-xs uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Wellness Simplified
          </p>
          <div className="h-px bg-neutral-300 flex-1" />
        </div>
      </section>

      {/* Modal */}
      {showModal && <NotifyModal onClose={() => setShowModal(false)} />}
    </>
  );
}