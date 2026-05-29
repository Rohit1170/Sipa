"use client";
import { StarRating } from "./StarRating";

const SANS  = { fontFamily: "'DM Sans', sans-serif" };
const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  body: string;
  isEdited: boolean;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
  currentUserId?: string | null;
  isAdmin?: boolean;
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatName(name: string) {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const parts = name.trim().split(/\s+/).map(cap);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export function ReviewCard({ review, currentUserId, isAdmin, onEdit, onDelete }: ReviewCardProps) {
  const isOwner = !!currentUserId && currentUserId === review.userId;

  return (
    <div className="bg-white border border-black/8 rounded-sm px-6 py-5 flex flex-col gap-3 hover:border-black/15 transition-colors duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.9rem] font-semibold text-[#1C1A17] leading-tight" style={SERIF}>
            {formatName(review.userName)}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <StarRating value={review.rating} size={13} />
            <span className="text-[0.7rem] text-[#9A8E82]" style={SANS}>
              {formatDate(review.createdAt)}
            </span>
            {review.isEdited && (
              <span className="text-[0.65rem] text-[#9A8E82] italic" style={SANS}>
                · Edited
              </span>
            )}
          </div>
        </div>

        {/* Owner edit / Admin delete */}
        <div className="flex items-center gap-2 shrink-0">
          {isOwner && !isAdmin && (
            <button
              onClick={() => onEdit(review)}
              className="text-[0.72rem] text-[#9A8E82] hover:text-[#C4541A] underline underline-offset-2 transition-colors"
              style={SANS}
            >
              Edit
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => onDelete(review._id)}
              className="text-[0.75rem] text-red-400 hover:text-red-600 transition-colors p-1 leading-none"
              aria-label="Delete review"
              title="Delete review"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Review body */}
      <p className="text-[0.84rem] text-[#5A5245] leading-relaxed" style={SANS}>
        {review.body}
      </p>
    </div>
  );
}
