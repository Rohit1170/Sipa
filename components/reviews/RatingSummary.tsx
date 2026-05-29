import { StarRating } from "./StarRating";

const SANS  = { fontFamily: "'DM Sans', sans-serif" };
const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };

interface RatingSummaryProps {
  reviews: Array<{ rating: number }>;
}

export function RatingSummary({ reviews }: RatingSummaryProps) {
  const count = reviews.length;
  if (count === 0) return null;

  const average = reviews.reduce((s, r) => s + r.rating, 0) / count;
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const n = reviews.filter((r) => r.rating === star).length;
    return { star, n, pct: Math.round((n / count) * 100) };
  });

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-10 p-6 bg-white border border-black/8 rounded-sm">
      {/* Average */}
      <div className="text-center min-w-[100px]">
        <p className="text-5xl font-bold text-[#1C1A17] leading-none mb-2" style={SERIF}>
          {average.toFixed(1)}
        </p>
        <StarRating value={Math.round(average)} size={15} />
        <p className="text-[0.72rem] text-[#9A8E82] mt-2" style={SANS}>
          {count} review{count !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Bar chart */}
      <div className="flex-1 w-full flex flex-col gap-2">
        {breakdown.map(({ star, n, pct }) => (
          <div key={star} className="flex items-center gap-2.5">
            <span className="text-[0.7rem] text-[#9A8E82] w-3 text-right shrink-0" style={SANS}>
              {star}
            </span>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="#C4541A" className="shrink-0">
              <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.01l-4.94 2.7.94-5.5-4-3.9 5.53-.8L10 1.5z" />
            </svg>
            <div className="flex-1 h-1.5 bg-black/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C4541A] rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[0.7rem] text-[#9A8E82] w-5 shrink-0" style={SANS}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
