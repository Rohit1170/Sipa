"use client";

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiffItem {
  num: string;
  title: string;
  desc: string;
}

interface PhilItem {
  tag: string;
  title: string;
  titleItalic: string;
  desc: string;
}

interface AudienceItem {
  icon: string;
  title: string;
  desc: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const differentiators: DiffItem[] = [
  {
    num: "01",
    title: "Science Over Trends",
    desc: "Formulation grounded in nutritional science. If the evidence doesn't support it, it doesn't go in.",
  },
  {
    num: "02",
    title: "Clarity Over Confusion",
    desc: "Full ingredient transparency — always. You deserve to know exactly what you are putting in your body.",
  },
  {
    num: "03",
    title: "Results Over Marketing",
    desc: "No quick fixes. We believe in consistency and building a strong nutritional foundation over time.",
  },
  {
    num: "04",
    title: "Clean Composition",
    desc: "No unnecessary ingredients. Every component has a clear, evidence-based reason to be there.",
  },
];

const philosophy: PhilItem[] = [
  {
    tag: "Philosophy",
    title: "Science-Backed ",
    titleItalic: "Simplicity",
    desc: "We follow evidence, not trends. Every decision — from ingredient sourcing to dosage to format — is guided by what your body genuinely needs.",
  },
  {
    tag: "Mission",
    title: "Daily Consistency Over ",
    titleItalic: "Quick Fixes",
    desc: "Health improves through small, smart habits practiced every single day. We design products to make those habits as effortless as possible.",
  },
  {
    tag: "Promise",
    title: "Responsible ",
    titleItalic: "Formulation",
    desc: "We will never compromise on ingredient quality, dosage transparency, or manufacturing integrity. If it isn't good enough for us — it won't go on your label.",
  },
];

const audience: AudienceItem[] = [
  {
    icon: "💼",
    title: "The Working Professional",
    desc: "Sitting under fluorescent lights all day, with no time to step outside.",
  },
  {
    icon: "🏠",
    title: "The Homemaker",
    desc: "Managing a household with every ounce of energy — and little left for self-care.",
  },
  {
    icon: "🌿",
    title: "The Health-Conscious",
    desc: "Someone who simply wants a safe, clean daily supplement — no more, no less.",
  },
];

const certs = [
  "WHO GMP Certified",
  "FSSAI Approved",
  "ISO 9001 Certified",
  "Third-Party Tested",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {children}
  </span>
);

const Divider: React.FC = () => (
  <hr className="border-none border-t border-neutral-300 my-12" style={{ borderTopWidth: "0.5px" }} />
);

const HeadingDisplay: React.FC<{
  plain: string;
  italic: string;
  size?: string;
}> = ({ plain, italic, size = "text-4xl md:text-5xl" }) => (
  <h2
    className={`${size} font-light leading-tight text-neutral-900`}
    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
  >
    {plain}
    <em className="italic text-orange-700 font-semibold">{italic}</em>
  </h2>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <main
      className="min-h-screen bg-[#f7f4ef] text-neutral-900"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 pb-24 pt-28">

        {/* ── Hero ── */}
        <section className="text-center pb-16 border-b border-neutral-300 mb-16">
          <SectionLabel>About SIPA Nutrition</SectionLabel>
          <h1
            className="text-5xl md:text-7xl font-light leading-tight text-neutral-900 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Built for{" "}
            <em className="italic font-semibold text-orange-700">India.</em>
            <br />
            Made with Purpose.
          </h1>
          <p className="text-sm font-light text-stone-500  max-w-md mx-auto leading-relaxed">
            We started with one honest observation — and built everything around it. This is our story.
          </p>
        </section>

        {/* ── Story + Who We Are ── */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-10 mb-16">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="text-2xl font-medium text-neutral-900 mb-4 leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Gap We{" "}
              <em className="italic">Couldn't Ignore</em>
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              Most Indians are deficient in Vitamin D3 — and almost nobody knows it. Not because
              they aren't trying, but because modern life doesn't make it easy. Indoor offices. Long
              commutes. AC rooms from morning to night. We built SIPA Nutrition to fill that gap
              with honest nutrition — not overhyped supplements or confusing jargon.
            </p>
          </div>

          {/* Vertical rule — hidden on mobile */}
          <div className="hidden md:block bg-[#f7f4ef] w-px" />

          <div className="mt-10 md:mt-0">
            <SectionLabel>Who We Are</SectionLabel>
            <h2
              className="text-2xl font-medium text-neutral-900 mb-4 leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              A Wellness Brand for{" "}
              <em className="italic">Real Life</em>
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              We are not a pharma company or a fitness brand chasing trends. We are a wellness brand
              built for working professionals, homemakers, and health-conscious Indians who want to
              do right by their body — without complicated routines. Our team comes from nutrition
              science and public health, spending months answering one question: why doesn't existing
              supplementation work?
            </p>
          </div>
        </section>

        <Divider />

        {/* ── What Makes Us Different ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>What Makes Us Different</SectionLabel>
            <HeadingDisplay plain="Not Loud. Just " italic="Right." />
            <p className="text-sm font-light text-stone-500 max-w-md mx-auto mt-3 leading-relaxed">
              Every decision we make is guided by what your body genuinely needs — not what looks
              impressive on a label.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-neutral-300 rounded-xl overflow-hidden">
            {differentiators.map((item, i) => (
              <div
                key={item.num}
                className={`p-6 bg-[#f7f4ef] ${
                  i < differentiators.length - 1
                    ? "border-b md:border-b-0 md:border-r border-neutral-300"
                    : ""
                }`}
              >
                <div
                  className="text-3xl font-light text-neutral-700 mb-4 leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {item.num}
                </div>
                <h3 className="text-xs font-medium text-neutral-900 uppercase tracking-[0.12em] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Philosophy / Mission / Promise ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>Our Philosophy, Mission & Promise</SectionLabel>
            <HeadingDisplay plain="What We " italic="Stand For" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {philosophy.map((item) => (
              <div
                key={item.tag}
                className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-6"
              >
                <span className="block text-[10px] uppercase tracking-[0.15em] text-orange-700 mb-3">
                  {item.tag}
                </span>
                <h3
                  className="text-xl font-medium text-neutral-900 mb-3 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {item.title}
                  <em className="italic">{item.titleItalic}</em>
                </h3>
                <p className="text-xs font-light text-stone-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Manufacturing ── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <SectionLabel>Manufacturing</SectionLabel>
            <HeadingDisplay plain="Made to the " italic="Highest Standard" />
          </div>

          <div className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-8 text-center">
            <p className="text-sm font-light text-stone-500 max-w-xl mx-auto mb-6 leading-relaxed">
              Our products are manufactured in a WHO GMP certified, FSSAI approved, ISO 9001
              certified facility in India — held to the same standards as pharmaceutical-grade
              production. Every batch undergoes third-party testing for purity, potency, and label
              accuracy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {certs.map((label) => (
                <span
                  key={label}
                  className="text-[10px] font-medium uppercase tracking-[0.1em] px-4 py-2 border border-neutral-300 rounded-full text-stone-500"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Who It's For ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>Who It's For</SectionLabel>
            <HeadingDisplay plain="Built for " italic="You" />
            <p className="text-sm font-light text-stone-500 max-w-md mx-auto mt-3 leading-relaxed">
              SIPA Nutrition was built for people who want to do right by their body — without a
              complicated routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {audience.map((item) => (
              <div
                key={item.title}
                className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-6 text-center"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs font-light text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center pt-12 border-t border-neutral-300">
          <SectionLabel>Ready to Begin</SectionLabel>
          <h2
            className="text-4xl font-light text-neutral-900 mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Start Your{" "}
            <em className="italic font-semibold text-orange-700">Daily Ritual</em>
          </h2>
          <p className="text-xs font-light text-neutral-500 mb-8 tracking-[0.1em] uppercase">
            ₹599 · 30 Sachets · ≈ ₹19.9 / day
          </p>

          {/* Matches the navbar Order button style */}
          <div className="relative group inline-block cursor-not-allowed">
            <span
              className="block px-8 py-3 bg-[#f7f4ef] border border-neutral-700 text-neutral-900 text-xs uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Order — ₹599
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-700 text-xs uppercase tracking-[0.2em] bg-neutral-900 border border-neutral-700"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Coming Soon
            </span>
          </div>
        </section>

      </div>
    </main>
  );
};

export default About;
