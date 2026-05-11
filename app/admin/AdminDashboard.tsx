"use client";
import { useState } from "react";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

interface User {
  email: string;
  name: string;
  phone: string;
  joinedAt: string | null;
  hasOrdered: boolean;
}

interface Props {
  totalUsers: number;
  totalOrders: number;
  notOrdered: number;
  users: User[];
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard({ totalUsers, totalOrders, notOrdered, users }: Props) {
  const [filter, setFilter] = useState<"all" | "ordered" | "not_ordered">("all");
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [sent, setSentMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const [bulkSending, setBulkSending] = useState(false);
  const [bulkDone, setBulkDone] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    const matchFilter =
      filter === "all" ? true : filter === "ordered" ? u.hasOrdered : !u.hasOrdered;
    const matchSearch =
      search === "" ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const sendAwareness = async (email: string, name: string) => {
    setSending((p) => ({ ...p, [email]: true }));
    setError((p) => ({ ...p, [email]: "" }));
    try {
      const res = await fetch("/api/admin/send-awareness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        setSentMap((p) => ({ ...p, [email]: true }));
      } else {
        setError((p) => ({ ...p, [email]: "Failed" }));
      }
    } catch {
      setError((p) => ({ ...p, [email]: "Error" }));
    }
    setSending((p) => ({ ...p, [email]: false }));
  };

  const sendBulk = async () => {
    const targets = users.filter((u) => !u.hasOrdered);
    setBulkSending(true);
    for (const u of targets) {
      await sendAwareness(u.email, u.name);
    }
    setBulkSending(false);
    setBulkDone(true);
  };

  const stats = [
    { label: "Total Registered", value: totalUsers, color: "#1C1A17", bg: "#F0EBE1" },
    { label: "Orders Placed", value: totalOrders, color: "#1C6B3A", bg: "#ECFDF5" },
    { label: "Not Yet Ordered", value: notOrdered, color: "#C4541A", bg: "#FEF0E8" },
  ];

  return (
    <div style={SANS}>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-black/8 px-3 py-3 sm:px-6 sm:py-5"
            style={{ background: s.bg }}
          >
            <p className="text-[0.55rem] sm:text-[0.62rem] font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase mb-1 leading-tight" style={{ color: s.color, ...SANS }}>
              {s.label}
            </p>
            <p className="text-2xl sm:text-4xl font-bold" style={{ color: s.color, ...SERIF }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {(["all", "ordered", "not_ordered"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-sm transition-all ${
                filter === f
                  ? "bg-[#C4541A] text-white"
                  : "bg-[#F0EBE1] text-[#5A5245] hover:bg-[#E8DDD0]"
              }`}
              style={SANS}
            >
              {f === "all" ? "All" : f === "ordered" ? "Ordered" : "Not Ordered"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0 text-[12px] border border-black/12 rounded-sm px-3 py-1.5 bg-white outline-none focus:border-[#C4541A]"
            style={SANS}
          />
          <button
            onClick={sendBulk}
            disabled={bulkSending || bulkDone || notOrdered === 0}
            className="shrink-0 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-sm bg-[#1C1A17] text-white hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={SANS}
          >
            {bulkSending ? "Sending…" : bulkDone ? "✓ All Sent" : `Send to All (${notOrdered})`}
          </button>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center py-10 text-[0.82rem] text-[#9A8E82]" style={SANS}>No users found.</p>
        ) : (
          filtered.map((u) => (
            <div key={u.email} className="bg-white rounded-xl border border-black/8 p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-[0.88rem] font-medium text-[#1C1A17] truncate" style={SERIF}>{u.name || "—"}</p>
                  <p className="text-[0.72rem] text-[#5A5245] break-all mt-0.5" style={SANS}>{u.email}</p>
                </div>
                <span
                  className={`shrink-0 text-[0.58rem] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${
                    u.hasOrdered ? "bg-[#1C6B3A]/10 text-[#1C6B3A]" : "bg-[#C4541A]/10 text-[#C4541A]"
                  }`}
                  style={SANS}
                >
                  {u.hasOrdered ? "✓ Ordered" : "Not Yet"}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[0.7rem] text-[#9A8E82] mb-3" style={SANS}>
                {u.phone && <span>{u.phone}</span>}
                <span>{formatDate(u.joinedAt)}</span>
              </div>
              {!u.hasOrdered && (
                <button
                  onClick={() => sendAwareness(u.email, u.name)}
                  disabled={sending[u.email] || sent[u.email]}
                  className="w-full text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-2 rounded-sm border border-[#C4541A] text-[#C4541A] hover:bg-[#C4541A] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  style={SANS}
                >
                  {sending[u.email] ? "Sending…" : sent[u.email] ? "✓ Sent" : "Send Email"}
                  {error[u.email] && <span className="ml-1 text-red-500">!</span>}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl border border-black/8 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/8">
              {["Name", "Email", "Phone", "Joined", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-[#9A8E82] px-5 py-3"
                  style={SANS}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[0.82rem] text-[#9A8E82]" style={SANS}>
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.email} className="border-b border-black/5 hover:bg-[#FAF7F2] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-[0.85rem] font-medium text-[#1C1A17]" style={SERIF}>{u.name || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[0.78rem] text-[#5A5245]" style={SANS}>{u.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[0.78rem] text-[#5A5245]" style={SANS}>{u.phone || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[0.75rem] text-[#9A8E82]" style={SANS}>{formatDate(u.joinedAt)}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm ${
                        u.hasOrdered ? "bg-[#1C6B3A]/10 text-[#1C6B3A]" : "bg-[#C4541A]/10 text-[#C4541A]"
                      }`}
                      style={SANS}
                    >
                      {u.hasOrdered ? "✓ Ordered" : "Not Ordered"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {!u.hasOrdered ? (
                      <button
                        onClick={() => sendAwareness(u.email, u.name)}
                        disabled={sending[u.email] || sent[u.email]}
                        className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-sm border border-[#C4541A] text-[#C4541A] hover:bg-[#C4541A] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        style={SANS}
                      >
                        {sending[u.email] ? "Sending…" : sent[u.email] ? "✓ Sent" : "Send Email"}
                        {error[u.email] && <span className="ml-1 text-red-500">!</span>}
                      </button>
                    ) : (
                      <span className="text-[0.72rem] text-[#9A8E82]" style={SANS}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[0.7rem] text-[#9A8E82] mt-4 text-right" style={SANS}>
        Showing {filtered.length} of {users.length} users
      </p>
    </div>
  );
}
