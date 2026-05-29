"use client";
import { useState } from "react";
import { StarRating } from "./StarRating";

const SANS  = { fontFamily: "'DM Sans', sans-serif" };
const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };

interface ReviewFormProps {
  editingReview?: { _id: string; rating: number; body: string } | null;
  onSubmit: (data: { rating: number; body: string }) => Promise<void>;
  onCancel?: () => void;
  submitting: boolean;
}

export function ReviewForm({ editingReview, onSubmit, onCancel, submitting }: ReviewFormProps) {
  const [rating, setRating] = useState(editingReview?.rating ?? 0);
  const [body, setBody]     = useState(editingReview?.body ?? "");
  const [errors, setErrors] = useState<{ rating?: string; body?: string }>({});

  const isEdit = !!editingReview;

  function validate() {
    const errs: { rating?: string; body?: string } = {};
    if (!rating) errs.rating = "Please select a star rating.";
    if (body.trim().length < 10) errs.body = "Review must be at least 10 characters.";
    if (body.trim().length > 1000) errs.body = "Review must be under 1000 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await onSubmit({ rating, body });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-black/10 rounded-sm p-6 flex flex-col gap-5"
    >
      <h4 className="text-[0.92rem] font-semibold text-[#1C1A17]" style={SERIF}>
        {isEdit ? "Edit Your Review" : "Write a Review"}
      </h4>

      {/* Star rating */}
      <div>
        <label className="block text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] mb-2.5" style={SANS}>
          Your Rating
        </label>
        <StarRating
          value={rating}
          interactive
          size={24}
          onChange={(r) => { setRating(r); setErrors((e) => ({ ...e, rating: undefined })); }}
        />
        {errors.rating && (
          <p className="text-[0.72rem] text-red-500 mt-1.5" style={SANS}>{errors.rating}</p>
        )}
      </div>

      {/* Review text */}
      <div>
        <label className="block text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#9A8E82] mb-2.5" style={SANS}>
          Your Review
        </label>
        <textarea
          value={body}
          onChange={(e) => { setBody(e.target.value); setErrors((err) => ({ ...err, body: undefined })); }}
          rows={4}
          maxLength={1000}
          placeholder="Share your experience with this product…"
          className="w-full text-[0.85rem] text-[#1C1A17] placeholder:text-[#C4B8A8] bg-[#FAF7F2] border border-black/10 rounded-sm px-4 py-3 resize-none focus:outline-none focus:border-[#C4541A] transition-colors"
          style={SANS}
        />
        <div className="flex justify-between mt-1">
          {errors.body
            ? <p className="text-[0.72rem] text-red-500" style={SANS}>{errors.body}</p>
            : <span />}
          <p className="text-[0.68rem] text-[#9A8E82]" style={SANS}>{body.length}/1000</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          type="submit"
          disabled={submitting}
          className="px-7 py-3 bg-[#1C1A17] hover:bg-[#C4541A] disabled:opacity-50 text-white text-[11px] font-semibold tracking-[0.18em] uppercase rounded-sm transition-colors duration-300"
          style={SANS}
        >
          {submitting ? "Submitting…" : isEdit ? "Save Changes" : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
            style={SANS}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
