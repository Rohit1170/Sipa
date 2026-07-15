import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/db";
import Coupon from "@/app/models/coupon";
import CouponsDashboard, { type CouponRow } from "./CouponsDashboard";

export const metadata: Metadata = {
  title: "Coupons · Admin Dashboard",
  robots: { index: false, follow: false },
};

const SERIF = { fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

export default async function AdminCouponsPage() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) redirect("/");

  await connectDB();
  const coupons = (await Coupon.find({}).sort({ createdAt: -1 }).lean()) as any[];

  const initialCoupons: CouponRow[] = coupons.map((c) => ({
    _id: c._id.toString(),
    code: c.code,
    discountType: c.discountType,
    discountValue: c.discountValue,
    isActive: c.isActive,
    expiryDate: c.expiryDate?.toISOString?.() || c.expiryDate,
    usageLimit: c.usageLimit,
    usedCount: c.usedCount,
  }));

  return (
    <div className="min-h-screen bg-[#FAF7F2]" style={SANS}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-2" style={SANS}>
              Admin · SIPA Nutrition
            </p>
            <h1 className="text-[clamp(28px,4vw,42px)] font-medium text-[#1C1A17] leading-tight" style={SERIF}>
              Coupons
            </h1>
            <p className="text-[0.82rem] text-[#9A8E82] mt-1" style={SANS}>
              Create and manage promo codes — usage updates automatically after a paid order.
            </p>
          </div>
          <Link
            href="/admin"
            className="text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-sm border border-black/15 text-[#5A5245] hover:bg-black/5 transition-colors"
            style={SANS}
          >
            ← Dashboard
          </Link>
        </div>

        <CouponsDashboard initialCoupons={initialCoupons} />
      </div>
    </div>
  );
}
