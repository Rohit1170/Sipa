"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { RatingSummary } from "./RatingSummary";
import { ReviewCard, type Review } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import AuthModal from "@/components/AuthModal";

const SANS  = { fontFamily: "'DM Sans', sans-serif" };
const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };

const ADMIN_EMAIL = "hello@sipanutrition.com";
const PRODUCT_ID  = "daily-d3-k2";
const PAGE_SIZE   = 5;

type SortOption = "newest" | "highest" | "lowest";

// ─── Micro-components ────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-sm text-[0.83rem] font-medium shadow-xl whitespace-nowrap ${
        type === "success" ? "bg-[#1C1A17] text-[#FAF7F2]" : "bg-red-600 text-white"
      }`}
      style={SANS}
    >
      {message}
    </div>
  );
}

function DeleteConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,8,5,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="bg-[#FAF7F2] rounded-sm border border-black/10 p-7 max-w-xs w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[0.88rem] font-semibold text-[#1C1A17] mb-1.5" style={SERIF}>
          Delete this review?
        </p>
        <p className="text-[0.8rem] text-[#5A5245] mb-5" style={SANS}>
          Are you sure you want to delete this review? This cannot be undone.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.15em] uppercase rounded-sm transition-colors"
            style={SANS}
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
            style={SANS}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function ReviewSection() {
  const { data: session } = useSession();
  const userId    = session?.user?.id   ?? null;
  const userEmail = session?.user?.email ?? null;
  const isAdmin   = userEmail?.toLowerCase() === ADMIN_EMAIL;

  const [reviews,       setReviews]       = useState<Review[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [sort,          setSort]          = useState<SortOption>("newest");
  const [page,          setPage]          = useState(1);
  const [showForm,      setShowForm]      = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteId,      setDeleteId]      = useState<string | null>(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [toast,         setToast]         = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${PRODUCT_ID}`);
      if (res.ok) setReviews(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const userReview = reviews.find((r) => r.userId === userId);

  // Sorted + paginated
  const sorted = [...reviews].sort((a, b) => {
    if (sort === "newest")  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function handleSubmit({ rating, body }: { rating: number; body: string }) {
    setSubmitting(true);
    try {
      const res  = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: PRODUCT_ID, rating, body }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? "Something went wrong", "error"); return; }
      setReviews((prev) => [data, ...prev]);
      setShowForm(false);
      showToast("Thanks for your review!");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit({ rating, body }: { rating: number; body: string }) {
    if (!editingReview) return;
    setSubmitting(true);
    try {
      const res  = await fetch(`/api/reviews/${editingReview._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, body }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? "Something went wrong", "error"); return; }
      setReviews((prev) => prev.map((r) => (r._id === data._id ? data : r)));
      setEditingReview(null);
      showToast("Your review has been updated");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) { showToast("Failed to delete review", "error"); return; }
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setDeleteId(null);
      showToast("Review deleted");
    } catch {
      showToast("Failed to delete review", "error");
    }
  }

  function handleWriteClick() {
    if (!userId) { setShowAuthModal(true); return; }
    setShowForm(true);
    setTimeout(() => document.getElementById("review-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function handleEditClick(review: Review) {
    setEditingReview(review);
    setShowForm(false);
    setTimeout(() => document.getElementById("review-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section id="reviews" className="border-t border-black/10 py-20 bg-[#FAF7F2]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-4" style={SANS}>
              Customer Reviews
            </p>
            <h2
              className="text-[clamp(26px,3vw,40px)] font-medium italic text-[#1C1A17] leading-[1.15]"
              style={SERIF}
            >
              What Our Customers <em>Say</em>
            </h2>
          </div>

          {/* Write a review CTA */}
          {!userReview && !showForm && !editingReview && (
            <button
              onClick={handleWriteClick}
              className="shrink-0 px-7 py-3 bg-[#1C1A17] hover:bg-[#C4541A] text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors duration-300"
              style={SANS}
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Rating summary */}
        {reviews.length > 0 && <RatingSummary reviews={reviews} />}

        {/* Submit / Edit form */}
        {(showForm || editingReview) && (
          <div id="review-form" className="mb-8">
            <ReviewForm
              editingReview={editingReview}
              onSubmit={editingReview ? handleEdit : handleSubmit}
              onCancel={() => { setShowForm(false); setEditingReview(null); }}
              submitting={submitting}
            />
          </div>
        )}

        {/* Sort controls */}
        {reviews.length > 1 && (
          <div className="flex items-center gap-2.5 mb-6 flex-wrap">
            <span className="text-[0.7rem] text-[#9A8E82] uppercase tracking-[0.12em]" style={SANS}>
              Sort:
            </span>
            {(["newest", "highest", "lowest"] as SortOption[]).map((opt) => (
              <button
                key={opt}
                onClick={() => { setSort(opt); setPage(1); }}
                className={`text-[0.7rem] font-medium uppercase tracking-[0.1em] px-3 py-1 rounded-sm transition-colors ${
                  sort === opt
                    ? "bg-[#1C1A17] text-[#FAF7F2]"
                    : "text-[#9A8E82] hover:text-[#1C1A17] border border-black/10 hover:border-black/25"
                }`}
                style={SANS}
              >
                {opt === "newest" ? "Most Recent" : opt === "highest" ? "Highest Rated" : "Lowest Rated"}
              </button>
            ))}
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-black/5 rounded-sm animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 border border-black/8 rounded-sm bg-white">
            <p className="text-[0.9rem] text-[#9A8E82] mb-4" style={SANS}>
              No reviews yet. Be the first to share your experience!
            </p>
            {!userId && (
              <button
                onClick={handleWriteClick}
                className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#C4541A] text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors duration-300"
                style={SANS}
              >
                Write the First Review
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUserId={userId}
                isAdmin={isAdmin}
                onEdit={handleEditClick}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 w-full py-3 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A5245] hover:bg-black/5 hover:border-black/25 transition-colors"
            style={SANS}
          >
            Load More ({sorted.length - visible.length} remaining)
          </button>
        )}

        {/* Admin note */}
        {isAdmin && reviews.length > 0 && (
          <p className="text-center text-[0.68rem] text-[#9A8E82] mt-6 tracking-[0.1em] uppercase" style={SANS}>
            Admin mode · Delete any review using the 🗑️ button
          </p>
        )}
      </div>

      {/* Overlays */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} callbackUrl="/productOverview#reviews" />
      {deleteId && (
        <DeleteConfirmDialog
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </section>
  );
}
