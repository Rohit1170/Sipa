"use client";

import Footer from "@/components/footer";
import React from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NOT_ELIGIBLE = [
  "Change of mind or cancelled intent after dispatch",
  "Taste, texture, or preference dissatisfaction",
  "Opened or partially consumed products",
  "Products without original packaging",
  "Damage caused by misuse or improper storage",
  "Courier delays or late deliveries",
];

const CLAIM_STEPS = [
  "Your Order ID",
  "A complete unboxing video — recorded from the sealed package, without any cuts or edits, clearly showing the damaged product or missing items",
  "Clear photographs of the package and contents received",
];

const AFTER_APPROVAL = [
  { label: "Approved damage claim", value: "Refund processed within 5–7 business days to your original payment method." },
  { label: "COD orders",            value: "Refund via bank transfer or UPI. Account details collected upon approval." },
  { label: "Missing item claim",    value: "Replacement dispatched within 5–7 business days." },
];

const CONTACT_ROWS = [
  { label: "Email",         value: "hello@sipanutrition.com" },
  { label: "WhatsApp",      value: "+91 96617 44207" },
  { label: "Response time", value: "Within 48 hours" },
];

const GRIEVANCE_ROWS = [
  { label: "Name",          value: "SIPA Nutrition Support Team" },
  { label: "Email",         value: "hello@sipanutrition.com" },
  { label: "Phone",         value: "+91 96617 44207" },
  { label: "Response time", value: "Within 48 hours of receiving a grievance" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3"
    style={{ fontFamily: "'Poppins', sans-serif" }}>
    {children}
  </span>
);

const Divider: React.FC = () => (
  <hr className="border-none my-12" style={{ borderTop: "0.5px solid #d4cfc8" }} />
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start gap-4 py-2.5 border-b border-neutral-200 last:border-0"
    style={{ fontFamily: "'Poppins', sans-serif" }}>
    <span className="text-xs text-neutral-400 w-28 shrink-0">{label}</span>
    <span className="text-sm text-neutral-700">{value}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PolicyClient: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-neutral-900"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 pb-24 pt-28">

        {/* ── Hero ── */}
        <section className="text-center pb-16 border-b border-neutral-300 mb-16">
          <SectionLabel>Legal · sipanutrition.com</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-light leading-tight text-neutral-900 mb-6"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
            Return &amp;{" "}
            <em className="italic font-semibold text-orange-700" style={{ fontStyle: "italic" }}>
              Refund Policy
            </em>
          </h1>
          <p className="text-sm font-light text-stone-500 max-w-md mx-auto leading-relaxed">
            We are committed to delivering quality products with care. Please read this policy carefully before placing your order.
          </p>
        </section>

        {/* ── 1. Policy at a Glance ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>Section 01</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-neutral-900"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
              Our Policy at a{" "}
              <em className="italic font-semibold text-orange-700">Glance</em>
            </h2>
          </div>

          <div className="border border-neutral-300 rounded-xl overflow-hidden mb-6">
            {/* header — hidden on mobile, shown on sm+ */}
            <div className="hidden sm:grid sm:grid-cols-3 bg-neutral-900 px-6 py-3">
              {["Claim Type", "Resolution", "Requirement"].map((h) => (
                <span key={h} className="text-[10px] uppercase tracking-[0.18em] text-white/50"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>{h}</span>
              ))}
            </div>
            {[
              { claim: "Damaged product received", res: "Refund",      req: "Unboxing video required" },
              { claim: "Missing item in order",    res: "Replacement", req: "Unboxing video required" },
            ].map((r, i) => (
              <div key={i}
                className={`flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:items-center px-6 py-4 border-t border-neutral-200 ${i % 2 !== 0 ? "bg-neutral-50/60" : "bg-[#f7f4ef]"}`}>
                <span className="text-sm text-neutral-700">{r.claim}</span>
                <span className={`text-[10px] font-medium uppercase tracking-[0.12em] px-3 py-1.5 rounded-full w-fit border ${
                  r.res === "Refund"
                    ? "bg-orange-50 text-orange-700 border-orange-200"
                    : "bg-green-50 text-green-800 border-green-200"
                }`}>
                  {r.res}
                </span>
                <span className="text-sm text-neutral-500">{r.req}</span>
              </div>
            ))}
          </div>

          <p className="text-sm font-light text-stone-500 leading-relaxed">
            We do not accept returns or exchanges under any circumstances.
          </p>
        </section>

        <Divider />

        {/* ── 2. Eligibility ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>Section 02</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-neutral-900"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
              Eligibility for{" "}
              <em className="italic font-semibold text-orange-700">Claims</em>
            </h2>
          </div>

          {/* Eligible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { tag: "Refund", title: "Damaged Product", desc: "A refund will be issued only if the product received is visibly damaged and unusable upon delivery." },
              { tag: "Replacement", title: "Missing Item", desc: "A replacement will be dispatched if an item is confirmed missing from your order after verification." },
            ].map((item) => (
              <div key={item.tag} className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-6">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-orange-700 mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.tag}
                </span>
                <h3 className="text-lg font-medium text-neutral-900 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-xs font-light text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Not eligible */}
          <div className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-6">
            <span className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Not Eligible
            </span>
            <ul className="m-0 p-0 list-none">
              {NOT_ELIGIBLE.map((item, i) => (
                <li key={i} className="flex items-start gap-3 py-2.5 border-b border-neutral-200 last:border-0">
                  <span className="text-red-500 text-xs mt-0.5 shrink-0">✕</span>
                  <span className="text-xs font-light text-stone-500 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* ── 3. How to Raise a Claim ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <SectionLabel>Section 03</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-neutral-900"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
              How to Raise{" "}
              <em className="italic font-semibold text-orange-700">a Claim</em>
            </h2>
            <p className="text-sm font-light text-stone-500 max-w-md mx-auto mt-3 leading-relaxed">
              Contact us within <strong className="text-neutral-800 font-medium">48 hours of delivery confirmation</strong> at{" "}
              <strong className="text-neutral-800 font-medium">hello@sipanutrition.com</strong> or WhatsApp{" "}
              <strong className="text-neutral-800 font-medium">+91 96617 44207</strong> with the following:
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-neutral-300 rounded-xl overflow-hidden mb-6">
            {CLAIM_STEPS.map((step, i) => (
              <div key={i}
                className={`p-6 bg-[#f7f4ef] ${i < CLAIM_STEPS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-neutral-300" : ""}`}>
                <div className="text-3xl font-light text-neutral-700 mb-4 leading-none"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#FB923C", opacity: 0.7 }}>
                  0{i + 1}
                </div>
                <p className="text-xs font-light text-stone-500 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
            <p className="text-xs text-orange-800 leading-relaxed m-0">
              📌 An unboxing video is mandatory for all claims. Claims submitted without a valid unboxing video cannot be processed.
            </p>
          </div>

          {/* After approval */}
          <div className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-6">
            <span className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              After Approval
            </span>
            {AFTER_APPROVAL.map((r) => (
              <div key={r.label} className="flex items-start gap-4 py-2.5 border-b border-neutral-200 last:border-0">
                <span className="text-xs font-medium text-neutral-800 w-44 shrink-0">{r.label}</span>
                <span className="text-xs font-light text-stone-500 leading-relaxed">→ {r.value}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 4 & 5. Cancellation + Contact side by side ── */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-10 mb-16">
          <div>
            <SectionLabel>Section 04</SectionLabel>
            <h2 className="text-2xl font-medium text-neutral-900 mb-4 leading-snug"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Cancellation{" "}
              <em className="italic text-orange-700">Policy</em>
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed mb-3">
              Orders can be cancelled only <strong className="text-neutral-800 font-medium">before dispatch</strong>. Once shipped, cancellations will not be accepted.
            </p>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              Contact us immediately at{" "}
              <strong className="text-neutral-800 font-medium">hello@sipanutrition.com</strong> or WhatsApp{" "}
              <strong className="text-neutral-800 font-medium">+91 96617 44207</strong>.
            </p>
          </div>

          <div className="hidden md:block bg-neutral-300 w-px" />

          <div className="mt-10 md:mt-0">
            <SectionLabel>Section 05</SectionLabel>
            <h2 className="text-2xl font-medium text-neutral-900 mb-4 leading-snug"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Contact &amp;{" "}
              <em className="italic text-orange-700">Support</em>
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed mb-4">
              We currently offer online support only.
            </p>
            {CONTACT_ROWS.map((r) => <InfoRow key={r.label} {...r} />)}
          </div>
        </section>

        <Divider />

        {/* ── 6. Grievance Officer ── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <SectionLabel>Section 06</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-neutral-900"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
              Grievance{" "}
              <em className="italic font-semibold text-orange-700">Officer</em>
            </h2>
          </div>

          <div className="bg-[#f7f4ef] border border-neutral-300 rounded-xl p-8">
            <p className="text-sm font-light text-stone-500 max-w-xl mx-auto mb-6 leading-relaxed text-center">
              In accordance with the Consumer Protection (E-Commerce) Rules, 2020, the following person has been designated as Grievance Officer for SIPA Nutrition:
            </p>
            <div className="max-w-sm mx-auto">
              {GRIEVANCE_ROWS.map((r) => <InfoRow key={r.label} {...r} />)}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
};

export default PolicyClient;