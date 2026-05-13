"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import AuthModal from "@/components/AuthModal";

// ─── FONT CONSTANTS ───────────────────────────────────────────────────────────
const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS  = { fontFamily: "'DM Sans', sans-serif" };

// ─── DATA ────────────────────────────────────────────────────────────────────

const ingredients = [
  {
    icon: "☀️",
    tags: ["Bone Health", "Immunity"],
    name: "Vitamin D3",
    sub: "Cholecalciferol · VitaShine®",
    desc: "Lichen-derived D3 — the most bioavailable vegan form available. Clinically proven to raise serum D levels, support calcium absorption, and regulate immune function.",
    amount: "600 IU",
    rda: "100% RDA",
    dark: false,
  },
  {
    icon: "🦴",
    tags: ["Calcium", "Heart Health"],
    name: "Vitamin K2",
    sub: "Menaquinone-7 · MK-7",
    desc: "The MK-7 form has the longest half-life — staying active far longer than MK-4. Directs calcium to your bones and teeth, away from your arteries.",
    amount: "55 mcg",
    rda: "100% RDA",
    dark: false,
  },
  {
    icon: "🍊",
    tags: [],
    name: "Natural Orange Flavour + Excipients",
    sub: "",
    desc: "Natural flavour from real sources. GRAS-certified excipients — no artificial dyes, no fillers, no anti-caking agents. What you see is what you get.",
    amount: "q.s.",
    rda: "GRAS · Natural",
    dark: true,
  },
];

const benefits = [
  { num: "01", title: "Stronger Bones", desc: "D3 drives calcium absorption. K2 places it in your bones — not your arteries. Together they build real skeletal strength." },
  { num: "02", title: "Year-Round Immunity", desc: "D3 is a key regulator of immune function. Daily maintenance keeps your defences primed through every season." },
  { num: "03", title: "Heart Protection", desc: "K2 (MK-7) actively prevents arterial calcification — a silent risk for people with office lifestyles." },
  { num: "04", title: "Less Fatigue, More Energy", desc: "D3 deficiency is the #1 hidden cause of chronic fatigue in urban India. Fix the root. Feel the difference." },
];

const usageSteps = [
  { step: "1", label: "Quantity", title: "One Sachet Per Day", desc: "Exactly 1g — the precise maintenance dose. No more, no less." },
  { step: "2", label: "Timing", title: "After Morning Meal", desc: "Take after breakfast. Morning intake aligns with your body's natural rhythm." },
  { step: "3", label: "Absorption Tip", title: "With a Fatty Food", desc: "D3 is fat-soluble. Taking with eggs, nuts, or ghee significantly boosts absorption." },
  { step: "4", label: "Duration", title: "Daily, Long-Term", desc: "Safe for continuous daily use. Benefits compound — consistency is the formula." },
];

const claims = [
  { title: "Third-Party Tested", desc: "Every batch tested for purity, potency, and heavy metals by independent ISO-accredited labs." },
  { title: "Vegan & Non-GMO", desc: "Plant-based sachets, zero genetically modified organisms. Clean from the ground up." },
  { title: "100% FSSAI Approved", desc: "Manufactured under FSSAI License No. 10426999000078, meeting strict national safety and quality standards." },
];

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address1?: string;
  city?: string;
  pincode?: string;
  formState?: string;
  consent?: string;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ProductOverview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [qty, setQty] = useState(1);

  // ── Form state ──
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [formState, setFormState] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [bookingSuccess, setBookingSuccess] = useState<{
    orderId: string;
    totalAmount: number;
    quantity: number;
  } | null>(null);

  // ── EDGE CASE 1: Track payment in progress to block accidental modal close ──
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  // ── EDGE CASE 2: Track if SDK is ready ──
  const [sdkReady, setSdkReady] = useState(false);

  // ── EDGE CASE 3: Ref to prevent double-click / concurrent payments ──
  const isSubmitting = useRef(false);

  // ── EDGE CASE 4: Track if payment succeeded (ref for use inside callbacks) ──
  const paymentSucceeded = useRef(false);
  const profileFetched = useRef(false);

  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ── Prefill form from session data (runs once per session) ───────────────
  useEffect(() => {
    if (!session?.user?.email || profileFetched.current) return;
    profileFetched.current = true;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.address1) setAddress1(data.address1);
        if (data.address2) setAddress2(data.address2);
        if (data.city) setCity(data.city);
        if (data.state) setFormState(data.state);
        if (data.pincode) setPincode(data.pincode);
      })
      .catch(() => {});
  }, [session]);

  const productImages = ["/prod3.png", "/prod2.jpeg", "/prod1.jpeg", "/prod4.jpeg", "/prod5.jpeg"];

  // ── Load Razorpay SDK ─────────────────────────────────────────────────────
  useEffect(() => {
    // If already loaded (e.g. hot reload), just set ready
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      toast({
        title: "Payment Unavailable",
        description: "Could not load payment module. Please check your connection and refresh.",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);
    return () => {
      // Only remove if we added it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // ── EDGE CASE 5: Warn user before leaving during active payment ──
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (paymentInProgress) {
        e.preventDefault();
        e.returnValue = "Payment is in progress. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [paymentInProgress]);

  // ── Escape key closes lightbox only ──────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const increase = () => setQty((prev) => Math.min(prev + 1, 10));
  const decrease = () => setQty((prev) => Math.max(prev - 1, 1));

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!address1.trim()) newErrors.address1 = "Address Line 1 is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }
    if (!formState.trim()) newErrors.formState = "State is required.";
    if (!consent) newErrors.consent = "Please give your consent to proceed.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ── Safe close — blocked during payment ──────────────────────────────────
  const handleCloseModal = () => {
    if (paymentInProgress) return;
    setShowForm(false);
    setBookingSuccess(null);
    setErrors({});
    paymentSucceeded.current = false;
  };

  // ── Reset all state helper ────────────────────────────────────────────────
  const resetPaymentState = () => {
    setIsLoading(false);
    setPaymentInProgress(false);
    isSubmitting.current = false;
  };

  // ── Main Payment Handler ──────────────────────────────────────────────────
  const handlePrebook = async () => {
    if (!validate()) return;

    // ── EDGE CASE: Prevent double submission ──
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    // ── EDGE CASE: SDK not loaded yet ──
    if (!sdkReady || !(window as any).Razorpay) {
      toast({
        title: "Payment Not Ready",
        description: "Payment module is still loading. Please wait a moment and try again.",
        variant: "destructive",
      });
      isSubmitting.current = false;
      return;
    }

    setIsLoading(true);
    setPaymentInProgress(true);
    paymentSucceeded.current = false;

    try {
      // ── Step 1: Create Razorpay order ──
      const orderRes = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast({
          title: "Order Failed",
          description: orderData.message || "Could not create payment order. Please try again.",
          variant: "destructive",
        });
        resetPaymentState();
        return;
      }

      const { orderId: razorpayOrderId, amount } = orderData;

      // ── Step 2: Open Razorpay checkout ──
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,           // comes from server — single source of truth
        currency: "INR",
        name: "SIPA Nutrition",
        description: "The Daily D3 + K2",
        order_id: razorpayOrderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#C4541A" },

        // ── EDGE CASE: Payment cancelled by user ──
        modal: {
          ondismiss: () => {
            if (paymentSucceeded.current) return; // payment went through — ignore dismiss
            resetPaymentState();
            setShowCancelModal(true);
          },
        },

        // ── EDGE CASE: Payment failed (card declined, bank error, timeout) ──
        "modal.ondismiss": undefined, // handled above
        notify: {
          sms: true,
          email: true,
        },

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // Mark success immediately so ondismiss doesn't interfere
          paymentSucceeded.current = true;

          try {
            // ── Step 3: Verify payment + save DB + send email ──
            const verifyRes = await fetch("/api/verifyPayment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerData: {
                  name, email, phone,
                  quantity: qty,
                  address1, address2,
                  pincode, city,
                  state: formState,
                  notes, consent,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            // ── EDGE CASE: Duplicate booking ──
            if (verifyRes.status === 409) {
              toast({
                title: "Already Pre-Booked",
                description: "This email already has an existing order.",
                variant: "destructive",
              });
              resetPaymentState();
              return;
            }

            if (!verifyRes.ok) {
              // Payment went through but verify failed — critical, show support info
              toast({
                title: "Verification Failed",
                description: `Payment received (ID: ${response.razorpay_payment_id}) but confirmation failed. Please contact support — you will NOT be double charged.`,
                variant: "destructive",
              });
              resetPaymentState();
              return;
            }

            // ── Step 4: Show success ──
            setBookingSuccess({
              orderId: verifyData.orderId,
              totalAmount: 399 * qty,
              quantity: qty,
            });
            setShowForm(true);
            resetPaymentState();

          } catch (err) {
            console.error("Verify network error:", err);
            toast({
              title: "Network Error During Verification",
              description: `Payment ID: ${response.razorpay_payment_id} — Please contact support. You will NOT be charged twice.`,
              variant: "destructive",
            });
            resetPaymentState();
          }
        },
      };

      // Attach payment.failed handler after options
      const rzp = new (window as any).Razorpay(options);

      // ── EDGE CASE: Payment explicitly failed (declined, insufficient funds etc.) ──
      rzp.on("payment.failed", (response: any) => {
        paymentSucceeded.current = false;
        resetPaymentState();
        const reason = response?.error?.description || "Payment was declined.";
        const code = response?.error?.code || "";
        toast({
          title: "Payment Failed",
          description: `${reason}${code ? ` (${code})` : ""} — Please try a different payment method.`,
          variant: "destructive",
        });
      });

      rzp.open();

    } catch (err) {
      console.error("handlePrebook error:", err);
      toast({
        title: "Network Error",
        description: "Could not connect to payment service. Please check your connection and try again.",
        variant: "destructive",
      });
      resetPaymentState();
    }
  };

  // ── Reusable error message ────────────────────────────────────────────────
  const ErrMsg = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-[10px] text-red-500 mt-1 ml-0.5" style={SANS}>{msg}</p> : null;

  const inputCls = (hasError?: string) =>
    `input rounded-sm w-full ${hasError ? "border-red-400 focus:border-red-400" : ""}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1A17]" style={SANS}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-6 lg:px-12 py-12 lg:py-16 items-start">

        {/* Gallery */}
        <div className="flex flex-col mt-6 gap-3">
          <div
            className="relative w-full aspect-square rounded-xl overflow-hidden cursor-zoom-in bg-[#f0ebe3]"
            onClick={() => setLightboxIndex(0)}
          >
            <Image src={productImages[activeThumb ?? 0]} alt="SIPA Nutrition D3+K2" fill priority className="object-cover" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {productImages.map((img, i) => (
              <div
                key={i}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-[#f0ebe3] transition-all duration-200 ${
                  activeThumb === i ? "ring-2 ring-[#C4541A] ring-offset-1" : "opacity-60 hover:opacity-100"
                }`}
                onClick={() => setActiveThumb(i)}
              >
                <Image src={img} alt={`Product view ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Lightbox ── */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,8,5,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev !== null ? (prev - 1 + productImages.length) % productImages.length : 0); }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-[#f0ebe3]" onClick={(e) => e.stopPropagation()}>
              <Image src={productImages[lightboxIndex]} alt={`Product ${lightboxIndex + 1}`} fill className="object-cover" />
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev !== null ? (prev + 1) % productImages.length : 0); }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {productImages.map((_, i) => (
                <button key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightboxIndex ? "bg-white w-4" : "bg-white/40"}`}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }} />
              ))}
            </div>
            <p className="absolute top-5 right-5 text-white/40 text-xs tracking-widest uppercase" style={SANS}>esc / click outside</p>
          </div>
        )}

        {/* Product Info */}
        <div className="pt-1 mt-6">
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#1C1A17] text-[#FAF7F2]" style={SANS}>In Stock</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#E8D5BC] text-[#5A5245]" style={SANS}>New Formula</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm border border-[#2D4A2D]/20 bg-[#2D4A2D]/10 text-[#2D4A2D]" style={SANS}>100% Vegan</span>
          </div>

          <h1 className="text-[clamp(32px,4vw,54px)] font-bold text-[#1C1A17] leading-[1.08] mb-3" style={SERIF}>
            The Daily Vitamins<br />D3 + K2
          </h1>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#9A8E82] mb-5" style={SANS}>
            Daily Vitamin Sachet
          </p>
          <p className="text-[0.9rem] leading-[1.75] text-[#5A5245] max-w-[420px] mb-8" style={SANS}>
            A precision-engineered vegan formula combining Vitamin D3 (VitaShine® lichen) with Vitamin K2 (MK-7). One slim 1g sachet a day, clinically dosed, zero fillers.
          </p>
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#E8D5BC] text-[#5A5245]" style={SANS}>600 IU</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#E8D5BC] text-[#5A5245]" style={SANS}>55 mcg</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#E8D5BC] text-[#5A5245]" style={SANS}>q.s.</span>
          </div>

          <div className="flex flex-col gap-3 mb-7">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-[#1C1A17] tracking-tight" style={SERIF}>₹399</span>
              <div className="flex flex-col">
                <span className="text-base text-[#9A8E82] line-through leading-none" style={SANS}>₹599</span>
                <span className="text-[0.7rem] font-bold text-white bg-[#1C6B3A] px-1.5 py-0.5 rounded-sm mt-0.5 tracking-wide" style={SANS}>33% OFF</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 fill-[#C4541A]">
                <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 1.5a.75.75 0 110 1.5.75.75 0 010-1.5zm-.5 2.5h1v4h-1V5z" />
              </svg>
              <p className="text-[0.75rem] text-[#5A5245] leading-relaxed" style={SANS}>
                Launch price — available for a limited time only.
              </p>
            </div>
          </div>

          {/* ── EDGE CASE: SDK not ready — disable button ── */}
          <button
            onClick={() => {
              if (!session) { setShowAuthModal(true); return; }
              setShowForm(true);
            }}
            disabled={!sdkReady}
            className="w-full py-[18px] bg-[#C4541A] hover:bg-[#D96528] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[0.8rem] font-semibold tracking-[0.18em] uppercase rounded-sm transition-colors mb-5"
            style={SANS}
          >
            {sdkReady ? "Order Now" : "Loading..."}
          </button>

          {/* ── Pre-booking Modal ── */}
          {showForm && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <div
                className="relative bg-white w-full max-w-md rounded-2xl border border-black/10 overflow-hidden"
                style={{ ...SANS, maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
              >

                {/* ── SUCCESS SCREEN ── */}
                {bookingSuccess ? (
                  <div className="px-8 py-10 flex flex-col items-center text-center overflow-y-auto" style={{ maxHeight: "90vh" }}>
                    <button onClick={handleCloseModal} className="absolute top-5 right-6 text-black/30 hover:text-black/70 text-lg">✕</button>

                    <div className="w-16 h-16 rounded-full bg-[#1C6B3A]/10 flex items-center justify-center mb-6">
                      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#1C6B3A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#C4541A] font-medium mb-2" style={SANS}>Payment Confirmed 🎉</p>
                    <h2 className="text-[28px] text-[#1a1410] leading-tight mb-2" style={SERIF}>
                      Order <span className="italic text-[#C4541A]">Confirmed.</span>
                    </h2>
                    <p className="text-[12px] text-black/40 mb-8" style={SANS}>Payment received — your spot is locked in.</p>

                    <div className="w-full bg-[#F5F0E8] rounded-sm px-6 py-5 mb-4 text-left">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#9A8E82] mb-3" style={SANS}>Order Summary</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] text-[#5A5245]" style={SANS}>The Daily D3 + K2 × {bookingSuccess.quantity} pack</span>
                        <span className="text-[12px] font-semibold text-[#1C1A17]" style={SANS}>₹{bookingSuccess.totalAmount}</span>
                      </div>
                      <div className="h-[1px] bg-black/10 my-3" />
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-[#1C1A17]" style={SANS}>Total Paid</span>
                        <span className="text-[22px] font-bold text-[#1C1A17]" style={SERIF}>₹{bookingSuccess.totalAmount}</span>
                      </div>
                    </div>

                    <div className="w-full bg-[#1C1A17] rounded-sm px-6 py-4 mb-6 text-left">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#FAF7F2]/40 mb-3" style={SANS}>What happens next</p>
                      {[
                        "✉️  Check your email for confirmation",
                        "🚀  We'll notify you the moment we ship",
                        "📦  Your order ships within 7–10 days",
                      ].map((line) => (
                        <p key={line} className="text-[11px] text-[#FAF7F2]/70 leading-relaxed mb-1" style={SANS}>{line}</p>
                      ))}
                    </div>

                    <p className="text-[10px] text-black/25 mb-6" style={SANS}>
                      Order ID: <span className="font-mono text-black/40">{bookingSuccess.orderId}</span>
                    </p>

                    <button
                      onClick={handleCloseModal}
                      className="w-full py-3 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
                      style={SANS}
                    >
                      Close
                    </button>
                  </div>

                ) : (

                  /* ── BOOKING FORM ── */
                  <>
                    <div className="px-8 pt-7 pb-5 border-b border-black/10 relative">
                      <button onClick={handleCloseModal} className="absolute top-5 right-6 text-black/30 hover:text-black/70 text-lg">✕</button>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-[#C4541A] font-medium mb-1" style={SANS}>Est. 2026 · Official Launch</p>
                      <h2 className="text-[26px] text-[#1a1410] leading-tight" style={SERIF}>
                        Reserve Your <span className="italic text-[#C4541A]">Daily Ritual.</span>
                      </h2>
                      <p className="text-[11px] text-black/40 mt-1" style={SANS}>Pay now · Ships within 7–10 days · Confirmation sent via email</p>
                    </div>

                    <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>

                      <div className="mb-5">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-2" style={SANS}>Personal Details</p>
                        <div className="mb-2">
                          <input placeholder="Full Name *" value={name} onChange={(e) => { setName(e.target.value); clearError("name"); }} className={inputCls(errors.name)} style={SANS} />
                          <ErrMsg msg={errors.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input placeholder="Mobile *" value={phone} onChange={(e) => { setPhone(e.target.value); clearError("phone"); }} className={inputCls(errors.phone)} style={SANS} />
                            <ErrMsg msg={errors.phone} />
                          </div>
                          <div>
                            <input placeholder="Email *" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email"); }} className={inputCls(errors.email)} style={SANS} />
                            <ErrMsg msg={errors.email} />
                          </div>
                        </div>
                      </div>

                      <div className="mb-5">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-2" style={SANS}>Quantity</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-black/20 bg-[#f7f4ef] rounded-sm">
                            <button onClick={decrease} className="px-3 py-2 text-lg hover:text-[#C4541A]">−</button>
                            <input
                              type="number" value={qty}
                              onChange={(e) => setQty(Math.min(10, Math.max(1, Number(e.target.value))))}
                              min={1} max={10}
                              className="w-12 text-center bg-transparent outline-none" style={SANS}
                            />
                            <button onClick={increase} className="px-3 py-2 text-lg hover:text-[#C4541A]">+</button>
                          </div>
                          <span className="text-[11px] text-black/40" style={SANS}>30 sachets / pack · ₹{399 * qty} total</span>
                        </div>
                      </div>

                      <div className="h-[1px] bg-black/10 my-5" />

                      <div className="mb-5">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-2" style={SANS}>Delivery Address</p>
                        <div className="mb-2">
                          <input placeholder="Address Line 1 *" value={address1} onChange={(e) => { setAddress1(e.target.value); clearError("address1"); }} className={inputCls(errors.address1)} style={SANS} />
                          <ErrMsg msg={errors.address1} />
                        </div>
                        <div className="mb-2">
                          <input placeholder="Address Line 2 (Optional)" value={address2} onChange={(e) => setAddress2(e.target.value)} className="input rounded-sm w-full" style={SANS} />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="col-span-2">
                            <input placeholder="City *" value={city} onChange={(e) => { setCity(e.target.value); clearError("city"); }} className={inputCls(errors.city)} style={SANS} />
                            <ErrMsg msg={errors.city} />
                          </div>
                          <div>
                            <input placeholder="Pincode *" value={pincode} onChange={(e) => { setPincode(e.target.value); clearError("pincode"); }} className={inputCls(errors.pincode)} style={SANS} />
                            <ErrMsg msg={errors.pincode} />
                          </div>
                        </div>
                        <div>
                          <input placeholder="State *" value={formState} onChange={(e) => { setFormState(e.target.value); clearError("formState"); }} className={inputCls(errors.formState)} style={SANS} />
                          <ErrMsg msg={errors.formState} />
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-2" style={SANS}>Delivery Notes (Optional)</p>
                        <textarea className="input h-16 rounded-sm resize-none w-full" placeholder="Instructions..." value={notes} onChange={(e) => setNotes(e.target.value)} style={SANS} />
                      </div>

                      <div>
                        <label className="flex gap-2 text-[11px] text-black/40 cursor-pointer" style={SANS}>
                          <input type="checkbox" className="accent-[#C4541A] mt-0.5" checked={consent} onChange={(e) => { setConsent(e.target.checked); clearError("consent"); }} />
                          I agree to be contacted via Email
                        </label>
                        <ErrMsg msg={errors.consent} />
                      </div>

                      <div className="mt-5 mb-3 bg-[#F5F0E8] rounded-sm px-4 py-3 flex justify-between items-center">
                        <span className="text-[11px] text-[#5A5245]" style={SANS}>Total ({qty} pack{qty > 1 ? "s" : ""})</span>
                        <span className="text-[18px] font-bold text-[#1C1A17]" style={SERIF}>₹{399 * qty}</span>
                      </div>

                      <button
                        onClick={handlePrebook}
                        disabled={isLoading || !sdkReady}
                        className="w-full py-4 mb-2 bg-[#C4541A] hover:bg-[#D96528] disabled:opacity-60 disabled:cursor-not-allowed rounded-sm text-white text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors flex items-center justify-center gap-2"
                        style={SANS}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          `Pay ₹${399 * qty} & Order →`
                        )}
                      </button>

                      <p className="text-center text-[10px] text-black/25 mt-2" style={SANS}>
                        🔒 Secured by Razorpay · UPI, Cards, NetBanking accepted
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── PAYMENT CANCELLED MODAL ── */}
          {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div
                className="relative bg-white w-full max-w-sm rounded-2xl border border-black/10 overflow-hidden"
                style={SANS}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top accent stripe */}
                <div className="h-1 w-full bg-gradient-to-r from-[#C4541A] to-[#E8763A]" />

                <div className="px-8 py-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#C4541A]/10 flex items-center justify-center mb-5">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        stroke="#C4541A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <p className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-2" style={SANS}>
                    Payment Cancelled
                  </p>
                  <h2 className="text-[24px] font-medium text-[#1C1A17] leading-tight mb-3" style={SERIF}>
                    No worries,{" "}
                    <em className="italic text-[#C4541A]">we saved your details.</em>
                  </h2>
                  <p className="text-[0.82rem] text-[#5A5245] leading-relaxed mb-1">
                    You closed the payment window before completing your order.
                  </p>
                  <p className="text-[0.78rem] text-[#9A8E82] leading-relaxed mb-7">
                    Your form is still filled — just click <strong>Try Again</strong> to pick up right where you left off.
                  </p>

                  {/* Reminder card */}
                  <div className="w-full bg-[#FAF7F2] border border-black/8 rounded-sm px-5 py-4 mb-7 text-left">
                    <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] mb-2" style={SANS}>
                      Your order
                    </p>
                    <p className="text-[0.92rem] font-medium text-[#1C1A17]" style={SERIF}>
                      The Daily D3 + K2 — {qty} pack{qty > 1 ? "s" : ""}
                    </p>
                    <p className="text-[0.75rem] text-[#C4541A] font-semibold mt-1" style={SANS}>
                      ₹{399 * qty} · 33% OFF · ≈ ₹13/day
                    </p>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      setShowForm(true);
                    }}
                    className="w-full py-3.5 bg-[#C4541A] hover:bg-[#D96528] text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors mb-3"
                    style={SANS}
                  >
                    Try Again →
                  </button>
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="w-full py-2.5 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
                    style={SANS}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-black/10">
            {[["🚚", "Free Shipping"], ["🌿", "Sustainably Sourced"], ["✅", "FSSAI Certified"]].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-[0.7rem] tracking-[0.1em] uppercase text-[#9A8E82]" style={SANS}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SUMMARY ── */}
      <section id="about" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-4" style={SANS}>About the Product</p>
        <h2 className="text-[clamp(28px,3vw,42px)] font-medium italic text-[#1C1A17] mb-10 leading-[1.2]" style={SERIF}>
          Simple Science, <em>Real Results.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-black/10">
          {[
            { icon: "🌿", title: "Vegan D3 via VitaShine®", desc: "Sourced from lichen — the purest plant-based Cholecalciferol available. No animal derivatives, ever." },
            { icon: "⚡", title: "MK-7 K2 — Longest Half-Life", desc: "Menaquinone-7 stays active in your body far longer than other K2 forms. One sachet is all you need." },
            { icon: "📦", title: "1g Slim Sachets · 30 Pack", desc: "Pocket-sized. Travel-ready. Designed to disappear into your morning routine without friction." },
          ].map((c) => (
            <div key={c.title} className="bg-[#FAF7F2] hover:bg-[#F3EDE3] transition-colors px-7 py-9">
              <div className="text-2xl mb-4">{c.icon}</div>
              <h3 className="text-[1.05rem] font-medium text-[#1C1A17] mb-2" style={SERIF}>{c.title}</h3>
              <p className="text-[0.83rem] leading-[1.7] text-[#5A5245]" style={SANS}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section id="ingredients" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 border-t border-black/10">
        <div className="mb-10">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3" style={SANS}>Ingredient Integrity</p>
          <h2 className="text-[clamp(26px,3vw,40px)] font-medium italic text-[#1C1A17] leading-[1.15]" style={SERIF}>
            Derived from Nature,<br /><em>Refined by Science</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {ingredients.map((ing) => (
            <div key={ing.name} className="p-8 rounded-sm border transition-all bg-white border-black/10 hover:border-[#C4541A] hover:shadow-[0_8px_32px_rgba(196,84,26,0.08)] flex flex-col h-full">
              <div className="flex-1">
                <span className="text-xl mb-5 block">{ing.icon}</span>
                <div className="flex gap-2 flex-wrap mb-4 min-h-[24px]">
                  {ing.tags.map((t) => (
                    <span key={t} className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-2 py-[3px] border border-black/15 rounded-sm text-[#5A5245]" style={SANS}>{t}</span>
                  ))}
                </div>
                <h3 className="text-[1.1rem] font-medium mb-1 text-[#1C1A17]" style={SERIF}>{ing.name}</h3>
                <p className="text-[0.72rem] italic mb-3 text-[#9A8E82] min-h-[16px]" style={SANS}>{ing.sub || ""}</p>
                <p className="text-[0.8rem] leading-[1.65] text-[#5A5245]" style={SANS}>{ing.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center border-black/10">
                <span className="text-xl text-[#1C1A17]" style={SERIF}>{ing.amount}</span>
                <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#C4541A]" style={SANS}>{ing.rda}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lab Report ── */}
      <section id="science" className="bg-[#F3EDE3] py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="max-w-[400px]">
            <div className="bg-white rounded-sm p-8 border border-black/10">
              <h3 className="text-xl font-bold border-b-[6px] border-[#1C1A17] pb-1.5 mb-1.5" style={SERIF}>Certified Lab Report</h3>
              <p className="text-[0.72rem] text-[#5A5245] mb-3 border-b-4 border-[#1C1A17] pb-2" style={SANS}>
                Tested at: <span className="font-semibold text-[#1C1A17]">United Laboratories Food Testing</span>
              </p>
              <div className="flex justify-between items-center pb-1 mb-1 text-[0.68rem] font-semibold text-[#9A8E82] uppercase tracking-wide" style={SANS}>
                <span className="flex-1">Nutrient</span>
                <span className="w-24 text-right">Label Claim</span>
                <span className="w-20 text-right">Result</span>
              </div>
              {[
                { label: "Vitamin D3 (Cholecalciferol)", claim: "15 mcg (600 IU)", result: "15.5 mcg (620 IU)" },
                { label: "Vitamin K2 (MK-7)", claim: "55 mcg", result: "55.5 mcg" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-black/8 text-[0.8rem]">
                  <span className="font-medium text-[#1C1A17] flex-1" style={SANS}>{row.label}</span>
                  <span className="w-24 text-right text-[#5A5245]" style={SANS}>{row.claim}</span>
                  <span className="w-20 text-right font-semibold text-[#1C6B3A]" style={SANS}>{row.result}</span>
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#1C6B3A] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[0.68rem] text-[#5A5245] leading-relaxed" style={SANS}>
                  Results meet or exceed all label claims. <span className="font-semibold text-[#1C1A17]">Certified batch report.</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[clamp(28px,3.5vw,50px)] font-medium italic text-[#1C1A17] mb-8 leading-[1.1]" style={SERIF}>
              No Fillers.<br />No Nonsense.
            </h2>
            <div className="flex flex-col gap-5">
              {claims.map((c) => (
                <div key={c.title} className="flex gap-4 items-start">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#C4541A] flex items-center justify-center text-white text-[0.7rem] flex-shrink-0 mt-0.5">✓</div>
                  <div>
                    <p className="text-[0.77rem] font-bold tracking-[0.1em] uppercase text-[#1C1A17] mb-1" style={SANS}>{c.title}</p>
                    <p className="text-[0.82rem] leading-[1.65] text-[#5A5245]" style={SANS}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS + HOW TO CONSUME ── */}
      <section id="benefits" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3" style={SANS}>Daily Benefits</p>
          <h2 className="text-[clamp(22px,2.5vw,34px)] font-medium italic text-[#1C1A17] mb-7 leading-[1.15]" style={SERIF}>
            What It Does<br />For Your Body
          </h2>
          <div className="flex flex-col">
            {benefits.map((b, i) => (
              <div key={b.num} className={`flex gap-4 items-start py-4 ${i < benefits.length - 1 ? "border-b border-black/8" : ""}`}>
                <span className="text-[1.3rem] text-[#D4B896] min-w-[28px]" style={SERIF}>{b.num}</span>
                <div>
                  <p className="text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-[#1C1A17] mb-1" style={SANS}>{b.title}</p>
                  <p className="text-[0.8rem] leading-[1.6] text-[#5A5245]" style={SANS}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3" style={SANS}>How to Consume</p>
          <h2 className="text-[clamp(22px,2.5vw,34px)] font-medium italic text-[#1C1A17] mb-7 leading-[1.15]" style={SERIF}>
            A Simple<br />Daily Ritual
          </h2>
          <div className="flex flex-col">
            {usageSteps.map((s, i) => (
              <div key={s.step} className={`flex gap-5 items-start py-5 ${i < usageSteps.length - 1 ? "border-b border-black/8" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-[#1C1A17] text-[#FAF7F2] flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0" style={SANS}>{s.step}</div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] mb-0.5" style={SANS}>{s.label}</p>
                  <p className="text-[0.88rem] font-semibold text-[#1C1A17] mb-1" style={SANS}>{s.title}</p>
                  <p className="text-[0.8rem] leading-[1.6] text-[#5A5245]" style={SANS}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        callbackUrl="/productOverview"
      />
    </div>
  );
}