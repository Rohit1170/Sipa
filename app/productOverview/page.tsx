
"use client";

import { useState } from "react";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ingredients = [
  {
    icon: "☀️",
    tags: ["Bone Health", "Immunity"],
    name: "Vitamin D3",
    sub: "Cholecalciferol · VitaShine®",
    desc:
      "Lichen-derived D3 — the most bioavailable vegan form available. Clinically proven to raise serum D levels, support calcium absorption, and regulate immune function.",
    amount: "600 IU",
    rda: "100% RDA",
    dark: false,
  },
  {
    icon: "🦴",
    tags: ["Calcium Direction", "Heart Health"],
    name: "Vitamin K2",
    sub: "Menaquinone-7 · MK-7",
    desc:
      "The MK-7 form has the longest half-life — staying active far longer than MK-4. Directs calcium to your bones and teeth, away from your arteries.",
    amount: "55 mcg",
    rda: "100% RDA",
    dark: false,
  },
  {
    icon: "🍊",
    tags: [],
    name: "Natural Orange Flavour + Excipients",
    sub: "",
    desc:
      "Natural flavour from real sources. GRAS-certified excipients — no artificial dyes, no fillers, no anti-caking agents. What you see is what you get.",
    amount: "q.s.",
    rda: "GRAS · Natural",
    dark: true,
  },
];

const benefits = [
  {
    num: "01",
    title: "Stronger Bones",
    desc: "D3 drives calcium absorption. K2 places it in your bones — not your arteries. Together they build real skeletal strength.",
  },
  {
    num: "02",
    title: "Year-Round Immunity",
    desc: "D3 is a key regulator of immune function. Daily maintenance keeps your defences primed through every season.",
  },
  {
    num: "03",
    title: "Heart Protection",
    desc: "K2 (MK-7) actively prevents arterial calcification — a silent risk for people with office lifestyles.",
  },
  {
    num: "04",
    title: "Less Fatigue, More Energy",
    desc: "D3 deficiency is the #1 hidden cause of chronic fatigue in urban India. Fix the root. Feel the difference.",
  },
];

const usageSteps = [
  {
    step: "1",
    label: "Quantity",
    title: "One Sachet Per Day",
    desc: "Exactly 1g — the precise maintenance dose. No more, no less.",
  },
  {
    step: "2",
    label: "Timing",
    title: "After Morning Meal",
    desc: "Take after breakfast. Morning intake aligns with your body's natural rhythm.",
  },
  {
    step: "3",
    label: "Absorption Tip",
    title: "With a Fatty Food",
    desc: "D3 is fat-soluble. Taking with eggs, nuts, or ghee significantly boosts absorption.",
  },
  {
    step: "4",
    label: "Duration",
    title: "Daily, Long-Term",
    desc: "Safe for continuous daily use. Benefits compound — consistency is the formula.",
  },
];

const testimonials = [
  {
    text: "I've tried D3 capsules for years and always forgot. The sachet just sits on my breakfast table and it's done. My vitamin D levels are back in range after just 2 months.",
    author: "Rohan S.",
    role: "Software Engineer, Pune",
  },
  {
    text: "Love that it's vegan and actually uses VitaShine D3 — not the cheap animal-derived stuff. Clean label, no junk. The orange flavour is subtle and nice.",
    author: "Meera K.",
    role: "Nutritionist, Mumbai",
  },
  {
    text: "The K2 + D3 combo is what I was looking for. I'd been taking them separately. SIPA just made it one simple step. Consistent energy, no more afternoon crashes.",
    author: "Arjun P.",
    role: "Yoga Instructor, Bangalore",
  },
];

const claims = [
  {
    title: "Third-Party Tested",
    desc: "Every batch tested for purity, potency, and heavy metals by independent ISO-accredited labs.",
  },
  {
    title: "Vegan & Non-GMO",
    desc: "Plant-based sachets, zero genetically modified organisms. Clean from the ground up.",
  },
  {
    title: "Zero Artificial Additives",
    desc: "No synthetic dyes, flavours, or anti-caking agents like magnesium stearate.",
  },
  {
    title: "WHO GMP · ISO 9001 · FSSAI",
    desc: "Manufactured at a certified facility meeting the highest international standards.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ProductOverview() {
  const [selectedPlan, setSelectedPlan] = useState<"subscribe" | "onetime">("subscribe");
  const [activeThumb, setActiveThumb] = useState(0);
  const [notified, setNotified] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1A17] font-sans">

      {/* ── FONTS via next/font or global CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        .import About from './page';
font-playfair { font-family: 'Playfair Display', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-12 h-[60px] bg-[#FAF7F2]/90 backdrop-blur-md border-b border-black/10 font-jost">
        <a href="#" className="font-playfair text-base font-bold tracking-[0.18em] uppercase text-[#1C1A17]">
          SIPA Nutrition
        </a>
        <ul className="hidden md:flex gap-9 list-none">
          {["Ingredients", "Benefits", "Science", "Journal"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-[#5A5245] hover:text-[#1C1A17] transition-colors font-jost">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-5 items-center text-[#5A5245]">
          <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-6 lg:px-12 py-12 lg:py-16 items-start font-jost">

        {/* Gallery */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-gradient-to-br from-[#E8D5BC] to-[#C49A6C]">
            <Image
              src="/hero.jpeg"
              alt="SIPA Nutrition D3+K2 Sachet"
              fill
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {/* Fallback sachet visual */}
            {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="relative w-36 h-52 bg-gradient-to-b from-[#2D4A2D] to-[#1A2E1A] rounded-xl flex flex-col items-center justify-center gap-2 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8A84B] to-[#E5C97A]" />
                <span className="font-playfair text-lg font-bold text-[#FAF7F2] tracking-widest">SIPA</span>
                <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#FAF7F2]/40">Nutrition</span>
                <span className="text-[0.65rem] tracking-widest uppercase text-[#C8A84B] mt-2">D3 + K2</span>
                <span className="font-playfair text-5xl font-light text-[#FAF7F2]/10 absolute bottom-2 right-3">30</span>
              </div>
            </div> */}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`aspect-[4/3] rounded-sm overflow-hidden cursor-pointer bg-gradient-to-br from-[#C49A6C] to-[#A07840] transition-all ${activeThumb === 0 ? "ring-2 ring-[#C4541A]" : ""}`}
              onClick={() => setActiveThumb(0)}
            >
              <div className="w-full h-full flex items-center justify-center text-[0.7rem] tracking-[0.12em] uppercase text-white/60">
                Ingredients
              </div>
            </div>
            <div
              className={`aspect-[4/3] rounded-sm overflow-hidden cursor-pointer bg-gradient-to-br from-[#D4B896] to-[#B89060] transition-all ${activeThumb === 1 ? "ring-2 ring-[#C4541A]" : ""}`}
              onClick={() => setActiveThumb(1)}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                <span className="text-2xl">🌿</span>
                <span className="text-[0.65rem] tracking-widest uppercase text-[#5A5245]">Vegan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-1">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#1C1A17] text-[#FAF7F2]">In Stock</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm bg-[#E8D5BC] text-[#5A5245]">New Formula</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm border border-[#2D4A2D]/20 bg-[#2D4A2D]/10 text-[#2D4A2D]">100% Vegan</span>
          </div>

          <h1 className="font-playfair text-[clamp(32px,4vw,54px)] font-medium italic text-[#1C1A17] leading-[1.08] mb-3">
            The Daily<br />D3 + K2
          </h1>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#9A8E82] mb-5">
            Daily Vitamin Sachet · India&apos;s First
          </p>
          <p className="text-[0.9rem] leading-[1.75] text-[#5A5245] max-w-[420px] mb-8">
            A precision-engineered vegan formula combining Vitamin D3 (VitaShine® lichen) with Vitamin K2 (MK-7). One slim 1g sachet a day, clinically dosed, zero fillers.
          </p>

          {/* Pricing Options */}
          <div className="flex flex-col gap-3 mb-7">
            {/* Subscribe */}
            <button
              onClick={() => setSelectedPlan("subscribe")}
              className={`flex items-center justify-between px-5 py-4 border-[1.5px] rounded-sm transition-all ${selectedPlan === "subscribe" ? "border-[#C4541A] bg-[#C4541A]/5" : "border-black/15 hover:border-[#C4541A]"}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedPlan === "subscribe" ? "border-[#C4541A]" : "border-black/20"}`}>
                  {selectedPlan === "subscribe" && <div className="w-2 h-2 rounded-full bg-[#C4541A]" />}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.82rem] font-semibold text-[#1C1A17]">Subscribe &amp; Save 10%</span>
                    <span className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-[2px] rounded-sm bg-[#C4541A] text-white">Save ₹60</span>
                  </div>
                  <p className="text-[0.72rem] text-[#9A8E82] mt-0.5">Delivered every 30 days. Cancel anytime.</p>
                </div>
              </div>
              <span className="font-playfair text-2xl font-light text-[#1C1A17]">₹539</span>
            </button>

            {/* One-time */}
            <button
              onClick={() => setSelectedPlan("onetime")}
              className={`flex items-center justify-between px-5 py-4 border-[1.5px] rounded-sm transition-all ${selectedPlan === "onetime" ? "border-[#C4541A] bg-[#C4541A]/5" : "border-black/15 hover:border-[#C4541A]"}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedPlan === "onetime" ? "border-[#C4541A]" : "border-black/20"}`}>
                  {selectedPlan === "onetime" && <div className="w-2 h-2 rounded-full bg-[#C4541A]" />}
                </div>
                <div className="text-left">
                  <span className="text-[0.82rem] font-semibold text-[#1C1A17]">One-Time Purchase</span>
                  <p className="text-[0.72rem] text-[#9A8E82] mt-0.5">Single box of 30 sachets (1g each)</p>
                </div>
              </div>
              <span className="font-playfair text-2xl font-light text-[#1C1A17]">₹599</span>
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => setNotified(true)}
            className="w-full py-[18px] bg-[#C4541A] hover:bg-[#D96528] text-white text-[0.8rem] font-semibold tracking-[0.18em] uppercase rounded-sm transition-colors mb-5 font-jost"
          >
            {notified ? "✓ You're on the list!" : "Notify Me at Launch"}
          </button>

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-black/10">
            {[["🚚", "Free Shipping"], ["🌿", "Sustainably Sourced"], ["✅", "FSSAI Certified"]].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-[0.7rem] tracking-[0.1em] uppercase text-[#9A8E82]">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SUMMARY ── */}
      <section id="about" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 font-jost">
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-4">About the Product</p>
        <h2 className="font-playfair text-[clamp(28px,3vw,42px)] font-medium italic text-[#1C1A17] mb-10 leading-[1.2]">
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
              <h3 className="font-playfair text-[1.05rem] font-medium text-[#1C1A17] mb-2">{c.title}</h3>
              <p className="text-[0.83rem] leading-[1.7] text-[#5A5245]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section id="ingredients" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 border-t border-black/10 font-jost">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3">Ingredient Integrity</p>
            <h2 className="font-playfair text-[clamp(26px,3vw,40px)] font-medium italic text-[#1C1A17] leading-[1.15]">
              Derived from Nature,<br /><em>Refined by Science</em>
            </h2>
          </div>
          <a href="#ingredients" className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] border-b border-black/20 pb-[2px] hidden md:block">
            View All Ingredients
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              className={`p-8 rounded-sm border transition-all ${ing.dark ? "bg-[#1C1A17] border-[#1C1A17]" : "bg-white border-black/10 hover:border-[#C4541A] hover:shadow-[0_8px_32px_rgba(196,84,26,0.08)]"}`}
            >
              <span className="text-xl mb-5 block">{ing.icon}</span>
              {ing.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {ing.tags.map((t) => (
                    <span key={t} className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-2 py-[3px] border border-black/15 rounded-sm text-[#5A5245]">{t}</span>
                  ))}
                </div>
              )}
              <h3 className={`font-playfair text-[1.1rem] font-medium mb-1 ${ing.dark ? "text-[#FAF7F2]" : "text-[#1C1A17]"}`}>{ing.name}</h3>
              {ing.sub && <p className={`text-[0.72rem] italic mb-3 ${ing.dark ? "text-[#FAF7F2]/40" : "text-[#9A8E82]"}`}>{ing.sub}</p>}
              <p className={`text-[0.8rem] leading-[1.65] ${ing.dark ? "text-[#FAF7F2]/50" : "text-[#5A5245]"}`}>{ing.desc}</p>
              <div className={`mt-4 pt-4 border-t flex justify-between items-center ${ing.dark ? "border-white/8" : "border-black/10"}`}>
                <span className={`font-playfair text-xl ${ing.dark ? "text-[#FAF7F2]" : "text-[#1C1A17]"}`}>{ing.amount}</span>
                <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#C4541A]">{ing.rda}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NUTRITION FACTS + CLAIMS ── */}
      <section id="science" className="bg-[#F3EDE3] py-20 font-jost">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Nutrition card */}
          <div className="max-w-[320px]">
            <div className="bg-white rounded-sm p-8 border border-black/10">
              <h3 className="font-playfair text-xl font-bold border-b-[6px] border-[#1C1A17] pb-1.5 mb-1.5">Nutrition Facts</h3>
              <p className="text-[0.72rem] text-[#5A5245] mb-3 border-b-4 border-[#1C1A17] pb-2">Serving Size: 1 Sachet (1g) · 30 Servings Per Pack</p>
              {[
                { label: "Vitamin D3 (Cholecalciferol)", val: "600 IU", rda: "100%" },
                { label: "Vitamin K2 (MK-7)", val: "55 mcg", rda: "100%" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-black/8 text-[0.8rem]">
                  <span className="font-medium text-[#1C1A17]">{row.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#5A5245]">{row.val}</span>
                    <span className="text-[0.7rem] font-semibold text-[#C4541A]">{row.rda}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center py-2 text-[0.8rem]">
                <span className="text-[#9A8E82]">Natural Flavour + Excipients</span>
                <span className="text-[#9A8E82]">q.s.</span>
              </div>
              <p className="text-[0.68rem] text-[#9A8E82] mt-3 leading-relaxed">
                *% Daily Value based on ICMR RDA. Sugar: 0g. Gluten Free. Non-GMO. 100% Vegan.
              </p>
            </div>
          </div>

          {/* Claims */}
          <div>
            <h2 className="font-playfair text-[clamp(28px,3.5vw,50px)] font-medium italic text-[#1C1A17] mb-8 leading-[1.1]">
              No Fillers.<br />No Nonsense.
            </h2>
            <div className="flex flex-col gap-5">
              {claims.map((c) => (
                <div key={c.title} className="flex gap-4 items-start">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#C4541A] flex items-center justify-center text-white text-[0.7rem] flex-shrink-0 mt-0.5">✓</div>
                  <div>
                    <p className="text-[0.77rem] font-bold tracking-[0.1em] uppercase text-[#1C1A17] mb-1">{c.title}</p>
                    <p className="text-[0.82rem] leading-[1.65] text-[#5A5245]">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS + HOW TO CONSUME ── */}
      <section id="benefits" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 font-jost">
        {/* Benefits */}
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3">Daily Benefits</p>
          <h2 className="font-playfair text-[clamp(22px,2.5vw,34px)] font-medium italic text-[#1C1A17] mb-7 leading-[1.15]">
            What It Does<br />For Your Body
          </h2>
          <div className="flex flex-col">
            {benefits.map((b, i) => (
              <div key={b.num} className={`flex gap-4 items-start py-4 ${i < benefits.length - 1 ? "border-b border-black/8" : ""}`}>
                <span className="font-playfair text-[1.3rem] text-[#D4B896] min-w-[28px]">{b.num}</span>
                <div>
                  <p className="text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-[#1C1A17] mb-1">{b.title}</p>
                  <p className="text-[0.8rem] leading-[1.6] text-[#5A5245]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to consume */}
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-3">How to Consume</p>
          <h2 className="font-playfair text-[clamp(22px,2.5vw,34px)] font-medium italic text-[#1C1A17] mb-7 leading-[1.15]">
            A Simple<br />Daily Ritual
          </h2>
          <div className="flex flex-col">
            {usageSteps.map((s, i) => (
              <div key={s.step} className={`flex gap-5 items-start py-5 ${i < usageSteps.length - 1 ? "border-b border-black/8" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-[#1C1A17] text-[#FAF7F2] flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] mb-0.5">{s.label}</p>
                  <p className="text-[0.88rem] font-semibold text-[#1C1A17] mb-1">{s.title}</p>
                  <p className="text-[0.8rem] leading-[1.6] text-[#5A5245]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#FAF7F2] border-t border-black/8 py-20 font-jost">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#9A8E82] text-center mb-4">Community Stories</p>
          <h2 className="font-playfair text-[clamp(26px,4vw,54px)] font-light italic text-[#1C1A17] text-center mb-14 leading-[1.15]">
            &ldquo;Finally, a supplement I<br />actually remember to take.&rdquo;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white border border-black/8 rounded-sm p-8">
                <div className="text-[#C4541A] text-sm tracking-[2px] mb-4">★★★★★</div>
                <p className="text-[0.88rem] leading-[1.75] text-[#5A5245] italic mb-5">&ldquo;{t.text}&rdquo;</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82]">{t.author}</p>
                <p className="text-[0.68rem] text-[#9A8E82] mt-0.5">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1C1A17] px-6 lg:px-12 pt-14 pb-7 font-jost">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="font-playfair text-base font-bold tracking-[0.18em] uppercase text-[#FAF7F2] mb-3">SIPA Nutrition</p>
            <p className="text-[0.78rem] leading-[1.7] text-[#FAF7F2]/30 max-w-[200px]">
              Defining the intersection of holistic nature and rigorous science. Est. 2026, India.
            </p>
          </div>
          {[
            { title: "Shop", links: ["D3 + K2 Sachets", "Bundles", "Subscribe"] },
            { title: "Assistance", links: ["Shipping & Returns", "Wholesale", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#FAF7F2]/30 mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[0.82rem] text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#FAF7F2]/30 mb-4">Newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-[0.8rem] px-4 py-3 bg-white/5 border border-white/10 text-[#FAF7F2] placeholder:text-[#FAF7F2]/20 outline-none rounded-l-sm"
              />
              <button className="px-4 py-3 bg-[#C4541A] hover:bg-[#D96528] text-white rounded-r-sm transition-colors text-base">→</button>
            </div>
            <p className="text-[0.68rem] text-[#FAF7F2]/20 mt-2">Early-bird pricing for subscribers.</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-white/5 pt-6">
          <span className="text-[0.7rem] text-[#FAF7F2]/20">© 2026 SIPA Nutrition. Holistic Refinement.</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-[0.7rem] text-[#FAF7F2]/20 hover:text-[#FAF7F2]/50 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}