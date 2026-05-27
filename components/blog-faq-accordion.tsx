"use client";
import React, { useState } from "react";

export interface BlogFaqItem {
  question: string;
  answer: string;
}

const serifFont: React.CSSProperties = {
  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
};

export function BlogFaqAccordion({ items }: { items: BlogFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2 my-8">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const numLabel = String(i + 1).padStart(2, "0");

        return (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
              isOpen
                ? "bg-orange-50/50 border-orange-200"
                : "bg-stone-50 border-stone-200 hover:border-orange-200"
            }`}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            {/* h3 wraps button per WAI-ARIA accordion pattern */}
            <h3 className="m-0">
              <button
                type="button"
                className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="text-[0.64rem] text-orange-700 font-bold tracking-[0.08em] shrink-0 pt-0.5 min-w-[1.8rem]">
                  {numLabel}
                </span>
                <span
                  className="flex-1 text-[0.9rem] font-semibold text-neutral-900 leading-snug"
                  style={serifFont}
                  itemProp="name"
                >
                  {item.question}
                </span>
                <svg
                  className={`shrink-0 w-4 h-4 text-orange-700 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
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
            </h3>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p
                className="px-6 pb-5 text-[0.87rem] text-stone-500 leading-relaxed m-0"
                itemProp="text"
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
