"use client";

import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="py-0 lg:py-8 bg-[#f7f4ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Contact
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's Start a
              <br />
              <em className="italic text-orange-700">Conversation.</em>
            </h2>
            <p
              className="text-neutral-500 text-base max-w-sm lg:text-right leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              We're currently in development. Reach out with any questions
              or to join us on our journey.
            </p>
          </div>
        </div>

        {/* Contact block */}
        <div
          className={`border border-neutral-200 p-10 sm:p-14 flex flex-col sm:flex-row sm:items-center justify-between gap-10 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Email info */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Email Us
            </p>
            <a
              href="mailto:hello@sipanutrition.com"
              className="text-2xl sm:text-3xl font-bold text-neutral-900 hover:text-orange-700 transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              hello@sipanutrition.com
            </a>
            <p
              className="mt-3 text-sm text-neutral-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              We typically respond within 24 hours.
            </p>
          </div>

          <div className="h-px sm:h-16 sm:w-px bg-neutral-200 flex-shrink-0" />

          {/* CTA */}
          <a href="mailto:hello@sipanutrition.com" className="flex-shrink-0">
            <button
              className="px-10 py-4 bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-semibold hover:bg-orange-700 transition-colors duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Send a Mail
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}