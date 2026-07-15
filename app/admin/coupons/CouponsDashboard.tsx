"use client";
import { useState } from "react";

const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

export interface CouponRow {
  _id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  isActive: boolean;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
}

interface FormState {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: string;
  expiryDate: string;
  usageLimit: string;
  isActive: boolean;
}

const emptyForm: FormState = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  expiryDate: "",
  usageLimit: "0",
  isActive: true,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function isExpired(iso: string) {
  return new Date(iso).getTime() < Date.now();
}

function couponUrl(code: string) {
  const base = process.env.NEXT_PUBLIC_FRONTEND_URL || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/productOverview?promo=${code}`;
}

export default function CouponsDashboard({ initialCoupons }: { initialCoupons: CouponRow[] }) {
  const [coupons, setCoupons] = useState<CouponRow[]>(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (coupon: CouponRow) => {
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: String(coupon.discountValue),
      expiryDate: coupon.expiryDate.slice(0, 10),
      usageLimit: String(coupon.usageLimit),
      isActive: coupon.isActive,
    });
    setEditingId(coupon._id);
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormError("");
  };

  const handleSave = async () => {
    setFormError("");

    if (!form.code.trim() || !form.discountValue || !form.expiryDate) {
      setFormError("Code, discount value and expiry date are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        expiryDate: form.expiryDate,
        usageLimit: Number(form.usageLimit) || 0,
        isActive: form.isActive,
      };

      const res = await fetch(
        editingId ? `/api/admin/coupons/${editingId}` : "/api/admin/coupons",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong.");
        return;
      }

      if (editingId) {
        setCoupons((prev) => prev.map((c) => (c._id === editingId ? data.coupon : c)));
      } else {
        setCoupons((prev) => [data.coupon, ...prev]);
      }

      closeForm();
    } catch {
      setFormError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this coupon? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (coupon: CouponRow) => {
    try {
      await navigator.clipboard.writeText(couponUrl(coupon.code));
      setCopiedId(coupon._id);
      setTimeout(() => setCopiedId((prev) => (prev === coupon._id ? null : prev)), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  const statusOf = (c: CouponRow) => {
    if (isExpired(c.expiryDate)) return { label: "Expired", cls: "bg-[#C4541A]/10 text-[#C4541A]" };
    if (!c.isActive) return { label: "Inactive", cls: "bg-black/10 text-[#5A5245]" };
    if (c.usageLimit > 0 && c.usedCount >= c.usageLimit) return { label: "Limit Reached", cls: "bg-[#C4541A]/10 text-[#C4541A]" };
    return { label: "Active", cls: "bg-[#1C6B3A]/10 text-[#1C6B3A]" };
  };

  const discountLabel = (c: CouponRow) => (c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`);

  return (
    <div style={SANS}>
      <div className="flex justify-end mb-5">
        <button
          onClick={openCreateForm}
          className="px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-sm bg-[#C4541A] text-white hover:bg-[#D96528] transition-colors"
          style={SANS}
        >
          + Create Coupon
        </button>
      </div>

      {/* ── Create / Edit form ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={closeForm}>
          <div
            className="relative bg-white w-full max-w-md rounded-2xl border border-black/10 p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeForm} className="absolute top-5 right-6 text-black/30 hover:text-black/70 text-lg">✕</button>
            <h2 className="text-[22px] text-[#1a1410] mb-5" style={SERIF}>
              {editingId ? "Edit Coupon" : "Create Coupon"}
            </h2>

            <div className="mb-3">
              <label className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 block" style={SANS}>Coupon Code</label>
              <input
                value={form.code}
                onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="ROH20"
                className="input rounded-sm w-full"
                style={SANS}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 block" style={SANS}>Discount Type</label>
                <select
                  value={form.discountType}
                  onChange={(e) => setForm((p) => ({ ...p, discountType: e.target.value as "percentage" | "flat" }))}
                  className="input rounded-sm w-full"
                  style={SANS}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat (₹)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 block" style={SANS}>
                  {form.discountType === "percentage" ? "Discount %" : "Discount ₹"}
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.discountValue}
                  onChange={(e) => setForm((p) => ({ ...p, discountValue: e.target.value }))}
                  placeholder={form.discountType === "percentage" ? "20" : "80"}
                  className="input rounded-sm w-full"
                  style={SANS}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 block" style={SANS}>Expiry Date</label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm((p) => ({ ...p, expiryDate: e.target.value }))}
                  className="input rounded-sm w-full"
                  style={SANS}
                />
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 block" style={SANS}>Usage Limit (0 = ∞)</label>
                <input
                  type="number"
                  min={0}
                  value={form.usageLimit}
                  onChange={(e) => setForm((p) => ({ ...p, usageLimit: e.target.value }))}
                  className="input rounded-sm w-full"
                  style={SANS}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-[12px] text-[#5A5245] mb-5 cursor-pointer" style={SANS}>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                className="accent-[#C4541A]"
              />
              Active
            </label>

            {formError && <p className="text-[11px] text-red-500 mb-3">{formError}</p>}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-[#C4541A] hover:bg-[#D96528] disabled:opacity-60 rounded-sm text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              style={SANS}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile cards ── */}
      <div className="sm:hidden space-y-3">
        {coupons.length === 0 ? (
          <p className="text-center py-10 text-[0.82rem] text-[#9A8E82]" style={SANS}>No coupons yet.</p>
        ) : (
          coupons.map((c) => {
            const status = statusOf(c);
            return (
              <div key={c._id} className="bg-white rounded-xl border border-black/8 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-[0.95rem] font-semibold text-[#1C1A17]" style={SERIF}>{c.code}</p>
                  <span className={`shrink-0 text-[0.58rem] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${status.cls}`} style={SANS}>
                    {status.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[0.72rem] text-[#9A8E82] mb-3" style={SANS}>
                  <span>{discountLabel(c)} off</span>
                  <span>Used {c.usedCount}{c.usageLimit > 0 ? ` / ${c.usageLimit}` : ""}</span>
                  <span>Expires {formatDate(c.expiryDate)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditForm(c)} className="flex-1 text-[11px] font-semibold uppercase px-3 py-2 rounded-sm border border-black/15 text-[#5A5245] hover:bg-black/5 transition-colors" style={SANS}>✏ Edit</button>
                  <button onClick={() => handleCopy(c)} className="flex-1 text-[11px] font-semibold uppercase px-3 py-2 rounded-sm border border-black/15 text-[#5A5245] hover:bg-black/5 transition-colors" style={SANS}>
                    {copiedId === c._id ? "✓ Copied" : "📋 Copy URL"}
                  </button>
                  <button onClick={() => handleDelete(c._id)} disabled={deletingId === c._id} className="flex-1 text-[11px] font-semibold uppercase px-3 py-2 rounded-sm border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 transition-colors" style={SANS}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden sm:block bg-white rounded-xl border border-black/8 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/8">
              {["Coupon", "Discount", "Used", "Status", "Expiry", "Actions"].map((h) => (
                <th key={h} className="text-left text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-[#9A8E82] px-5 py-3" style={SANS}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[0.82rem] text-[#9A8E82]" style={SANS}>No coupons yet.</td>
              </tr>
            ) : (
              coupons.map((c) => {
                const status = statusOf(c);
                return (
                  <tr key={c._id} className="border-b border-black/5 hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-[0.85rem] font-semibold text-[#1C1A17]" style={SERIF}>{c.code}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[0.78rem] text-[#5A5245]" style={SANS}>{discountLabel(c)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[0.78rem] text-[#5A5245]" style={SANS}>{c.usedCount}{c.usageLimit > 0 ? ` / ${c.usageLimit}` : ""}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm ${status.cls}`} style={SANS}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[0.75rem] text-[#9A8E82]" style={SANS}>{formatDate(c.expiryDate)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => openEditForm(c)} className="text-[11px] font-semibold uppercase px-2.5 py-1.5 rounded-sm border border-black/15 text-[#5A5245] hover:bg-black/5 transition-colors" style={SANS}>✏ Edit</button>
                        <button onClick={() => handleCopy(c)} className="text-[11px] font-semibold uppercase px-2.5 py-1.5 rounded-sm border border-black/15 text-[#5A5245] hover:bg-black/5 transition-colors" style={SANS}>
                          {copiedId === c._id ? "✓ Copied" : "📋 Copy URL"}
                        </button>
                        <button onClick={() => handleDelete(c._id)} disabled={deletingId === c._id} className="text-[11px] font-semibold uppercase px-2.5 py-1.5 rounded-sm border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 transition-colors" style={SANS}>
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
