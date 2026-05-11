import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/db";
import Prebook from "@/app/models/prebook";
import UserMeta from "@/app/models/userMeta";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

function getInitials(str: string) {
  const parts = str.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return str.slice(0, 2).toUpperCase();
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/");

  await connectDB();

  const [prebook, userMeta] = await Promise.all([
    Prebook.findOne({ email: session.user.email }).lean(),
    UserMeta.findOne({ email: session.user.email }).lean(),
  ]);

  const p = prebook as any;
  const m = userMeta as any;

  const isAdmin = session.user.email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
  const displayName = p?.name || m?.name || session.user.email.split("@")[0];
  const firstName = displayName.split(" ")[0];
  const initials = getInitials(displayName);
  const quantity = p?.totalQuantity || p?.quantity || 1;
  const amountPaid = p?.totalAmountPaid || quantity * 399;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1A17]" style={SANS}>
      <div className="max-w-2xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-2"
            style={SANS}
          >
            Your Wellness Journey
          </p>
          <h1
            className="text-[clamp(28px,4vw,42px)] font-medium text-[#1C1A17] leading-tight"
            style={SERIF}
          >
            Welcome back,{" "}
            <em className="italic text-[#C4541A]">{firstName}.</em>
          </h1>
          <p className="text-[0.82rem] text-[#9A8E82] mt-2 max-w-sm leading-relaxed" style={SANS}>
            Every day you show up for yourself is a day well lived. Here&apos;s your story so far.
          </p>
        </div>

        {/* User card */}
        <div className="bg-white rounded-xl border border-black/8 px-8 py-6 mb-5">
          <div className="flex items-center gap-5">
            <div
              className="w-14 h-14 rounded-full bg-[#C4541A] text-white flex items-center justify-center text-xl font-bold shrink-0"
              style={SERIF}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-[#1C1A17] truncate" style={SERIF}>
                {displayName}
              </p>
              <p className="text-[0.78rem] text-[#9A8E82] truncate" style={SANS}>
                {session.user.email}
              </p>
              {m?.phone && (
                <p className="text-[0.75rem] text-[#9A8E82] mt-0.5" style={SANS}>
                  {m.phone}
                </p>
              )}
            </div>
          </div>

          {/* Wellness nudge */}
          <div className="mt-5 pt-5 border-t border-black/6">
            <p className="text-[0.78rem] text-[#5A5245] leading-relaxed italic" style={SERIF}>
              &ldquo;Small daily habits compound into extraordinary health. You&apos;re already one step ahead.&rdquo;
            </p>
          </div>
        </div>

        {/* Order card */}
        {p ? (
          <div className="bg-white rounded-xl border border-black/8 overflow-hidden mb-5">
            <div className="px-8 py-4 border-b border-black/8 flex items-center justify-between">
              <p
                className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#9A8E82]"
                style={SANS}
              >
                Your Order
              </p>
              <span
                className={`text-[0.62rem] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm ${
                  p.status === "paid"
                    ? "bg-[#1C6B3A]/10 text-[#1C6B3A]"
                    : "bg-amber-100 text-amber-700"
                }`}
                style={SANS}
              >
                {p.status === "paid" ? "✓ Confirmed" : "⏳ Pending"}
              </span>
            </div>

            {/* Status banner */}
            {p.status === "paid" ? (
              <div className="px-8 py-4 bg-[#1C6B3A]/5 border-b border-black/5">
                <p className="text-[0.8rem] text-[#1C6B3A] font-medium" style={SANS}>
                  You&apos;re officially part of the SIPA family. Your formula is on its way. ✦
                </p>
                <p className="text-[0.72rem] text-[#1C6B3A]/70 mt-0.5" style={SANS}>
                  Consistency is the secret — you&apos;re already ahead of the curve.
                </p>
              </div>
            ) : (
              <div className="px-8 py-4 bg-amber-50 border-b border-black/5">
                <p className="text-[0.8rem] text-amber-700 font-medium" style={SANS}>
                  Almost there — your order is being processed.
                </p>
                <p className="text-[0.72rem] text-amber-600/80 mt-0.5" style={SANS}>
                  Reach out to us if anything feels off.
                </p>
              </div>
            )}

            <div className="px-8 py-6 flex flex-col gap-5">
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9A8E82] mb-1"
                  style={SANS}
                >
                  Product
                </p>
                <p className="text-[0.95rem] font-medium text-[#1C1A17]" style={SERIF}>
                  The Daily D3 + K2
                </p>
                <p className="text-[0.75rem] text-[#5A5245]" style={SANS}>
                  {quantity} pack{quantity > 1 ? "s" : ""} · {quantity * 30} sachets ·{" "}
                  {quantity * 30} days of wellness
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p
                    className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9A8E82] mb-1"
                    style={SANS}
                  >
                    Total Paid
                  </p>
                  <p className="text-[1.15rem] font-bold text-[#1C1A17]" style={SERIF}>
                    ₹{amountPaid}
                  </p>
                  <p className="text-[0.68rem] text-[#9A8E82]" style={SANS}>
                    ≈ ₹{Math.round(amountPaid / (quantity * 30))}/day
                  </p>
                </div>
                {p.phone && (
                  <div>
                    <p
                      className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9A8E82] mb-1"
                      style={SANS}
                    >
                      Phone
                    </p>
                    <p className="text-[0.85rem] text-[#5A5245]" style={SANS}>
                      {p.phone}
                    </p>
                  </div>
                )}
              </div>

              {p.address1 && (
                <div>
                  <p
                    className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9A8E82] mb-1"
                    style={SANS}
                  >
                    Delivery Address
                  </p>
                  <p
                    className="text-[0.85rem] text-[#5A5245] leading-relaxed"
                    style={SANS}
                  >
                    {[p.address1, p.address2, p.city, p.state, p.pincode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              )}

              {p.createdAt && (
                <div>
                  <p
                    className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9A8E82] mb-1"
                    style={SANS}
                  >
                    Member Since
                  </p>
                  <p className="text-[0.85rem] text-[#5A5245]" style={SANS}>
                    {formatDate(p.createdAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-black/8 px-8 py-12 text-center mb-5">
            <p className="text-3xl mb-3">✦</p>
            <h2
              className="text-[1.2rem] font-medium text-[#1C1A17] mb-2"
              style={SERIF}
            >
              Your story is still unwritten.
            </h2>
            <p className="text-[0.82rem] text-[#5A5245] mb-1 max-w-xs mx-auto leading-relaxed" style={SANS}>
              The best time to start taking care of yourself was yesterday.
            </p>
            <p className="text-[0.82rem] text-[#C4541A] font-medium mb-7" style={SANS}>
              The second best time is right now.
            </p>
            <Link
              href="/productOverview"
              className="inline-block px-8 py-3 bg-[#C4541A] text-white text-[0.72rem] font-semibold tracking-[0.18em] uppercase rounded-sm hover:bg-[#D96528] transition-colors"
              style={SANS}
            >
              Start Your Journey →
            </Link>
          </div>
        )}

        {/* Admin shortcut */}
        {isAdmin && (
          <div className="mb-4 text-center">
            <Link
              href="/admin"
              className="inline-block px-6 py-2.5 bg-[#1C1A17] text-white text-[0.72rem] font-semibold tracking-[0.18em] uppercase rounded-sm hover:bg-[#333] transition-colors"
              style={SANS}
            >
              Admin Dashboard →
            </Link>
          </div>
        )}

        {/* Sign out */}
        <div className="text-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
