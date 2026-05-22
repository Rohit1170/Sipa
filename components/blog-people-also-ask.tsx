"use client";
import React, { useState } from "react";

export interface PaaItem {
  question: string;
  answer: string;
}

const serifFont: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
};

export function PeopleAlsoAsk({ items }: { items: PaaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="People also ask" className="my-4">
      <div className="mb-6">
        <span className="text-[0.67rem] font-semibold tracking-[0.14em] uppercase text-orange-700 block mb-2">
          Search Insights
        </span>
        <h2
          style={serifFont}
          className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-normal text-neutral-900 leading-snug
                     hover:text-orange-700 transition-colors duration-300"
        >
          People Also Ask
        </h2>
      </div>

      <div className="flex flex-col gap-0 border border-stone-200 rounded-xl overflow-hidden">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const isLast = i === items.length - 1;

          return (
            <div
              key={i}
              className={`${!isLast ? "border-b border-stone-200" : ""} ${
                isOpen ? "bg-stone-50" : "bg-white"
              } transition-colors duration-200`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="text-[0.9rem] font-medium text-neutral-900 leading-snug">
                  {item.question}
                </span>
                <svg
                  className={`shrink-0 w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-orange-700" : "text-stone-400"
                  }`}
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0 border-t border-stone-100">
                  <p className="text-[0.87rem] text-stone-600 leading-[1.75] m-0 pt-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
