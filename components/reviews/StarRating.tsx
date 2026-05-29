"use client";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  value,
  max = 5,
  size = 16,
  interactive = false,
  onChange,
  className = "",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const displayed = interactive ? hovered || value : value;

  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Star rating" : `${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = displayed > i;
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={interactive ? "cursor-pointer" : "cursor-default pointer-events-none"}
            style={{ background: "none", border: "none", padding: 0, lineHeight: 0 }}
            aria-label={interactive ? `${i + 1} star${i !== 0 ? "s" : ""}` : undefined}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 20 20"
              fill={filled ? "#C4541A" : "none"}
              stroke={filled ? "#C4541A" : "#D4CFC9"}
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.01l-4.94 2.7.94-5.5-4-3.9 5.53-.8L10 1.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
