"use client";

import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Benefits", href: "#benefits" },
    { label: "Ingredients", href: "#ingredients" },
    // { label: "Usage", href: "#dosage" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand */}
            <a href="#">
              <img src="/logo.png" alt="SIPA Nutrition Logo" className="h-24 w-auto" />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setAboutOpen(true)}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About
              </button>

              {/* Desktop Order button */}
              <div
                className="relative group cursor-not-allowed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="block px-5 py-2 bg-neutral-900 text-white text-xs uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity duration-200">
                  Order — ₹599
                </span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-400 text-xs uppercase tracking-[0.2em] bg-neutral-900">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-neutral-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 flex flex-col gap-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setAboutOpen(true); }}
              className="text-left text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors"
            >
              About
            </button>

            {/* Mobile Order button */}
            <div
              className="relative group cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="block px-5 py-3 bg-neutral-900 text-white text-xs uppercase tracking-[0.2em] text-center group-hover:opacity-0 transition-opacity duration-200">
                Order — ₹599
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-400 text-xs uppercase tracking-[0.2em] bg-neutral-900">
                Coming Soon
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* About overlay */}
      {aboutOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setAboutOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div
            className="relative ml-auto w-full max-w-lg h-full bg-[#f7f4ef] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-10 py-8 border-b border-neutral-200">
              <p
                className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About Us
              </p>
              <button
                onClick={() => setAboutOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-10 py-12 flex flex-col gap-10 flex-1">
              <h2
                className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nutrition that
                <br />
                <em className="italic text-orange-700">Fits Real Life.</em>
              </h2>

              <div className="h-px bg-neutral-300" />

              <div
                className="flex flex-col gap-6 text-sm text-neutral-500 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <p>
                  At SIPA Nutrition, we believe nutrition should fit into real
                  life — not demand perfection. Our approach is rooted in
                  science-backed formulations, clean composition, and thoughtful
                  simplicity.
                </p>
                <p>
                  We focus on nutrients your body genuinely needs, designed for
                  daily consistency rather than quick fixes. Our Daily Vitamin
                  D3 + K2 sachet supports bone health, immunity, and overall
                  well-being — simply, consistently, and responsibly.
                </p>
                <p>
                  We don't believe health changes overnight. We believe it
                  improves through small, steady habits — practiced daily. By
                  combining modern nutritional science with responsible
                  formulation practices, we create supplements you can trust
                  and actually stick to.
                </p>
                <p>
                  SIPA Nutrition is for people who balance ambition with
                  responsibility — at work, at home, and with themselves. For
                  those who understand that health isn't about perfection, but
                  about care, consistency, and informed choices.
                </p>
              </div>

              <div className="h-px bg-neutral-300" />

              <div className="grid grid-cols-1 gap-px bg-neutral-300">
                {[
                  { label: "Philosophy", value: "Science-Backed Simplicity" },
                  { label: "Mission", value: "Daily Consistency Over Quick Fixes" },
                  { label: "Promise", value: "Clean, Responsible Formulation" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f7f4ef] py-5 flex justify-between items-center gap-4">
                    <p
                      className="text-xs uppercase tracking-[0.2em] text-neutral-400"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-bold text-neutral-900 text-right"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="text-base font-bold text-orange-700 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Because you matter.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}