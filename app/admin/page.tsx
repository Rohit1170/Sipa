import type { Metadata } from "next";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};
import { connectDB } from "@/app/lib/db";
import UserMeta from "@/app/models/userMeta";
import Prebook from "@/app/models/prebook";
import AdminDashboard from "./AdminDashboard";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) redirect("/");

  await connectDB();

  const [allPaidPrebooks, userMetas, totalOrders] = await Promise.all([
    Prebook.find({ status: "paid" }).lean(),
    UserMeta.find({}).sort({ createdAt: -1 }).lean(),
    Prebook.countDocuments({ status: "paid" }),
  ]);

  const orderedSet = new Set((allPaidPrebooks as any[]).map((p) => p.email?.toLowerCase()));
  const metaEmailSet = new Set((userMetas as any[]).map((m) => m.email?.toLowerCase()));

  // Everyone who filled the signup form (usermetas is source of truth for registrants)
  const registeredUsers = (userMetas as any[]).map((m) => ({
    email: m.email,
    name: m.name || "",
    phone: m.phone || "",
    joinedAt: m.createdAt?.toISOString?.() || null,
    hasOrdered: orderedSet.has(m.email?.toLowerCase()),
  }));

  // Customers who ordered via Razorpay but never registered on the site
  const prebookOnlyUsers = (allPaidPrebooks as any[])
    .filter((p) => !metaEmailSet.has(p.email?.toLowerCase()))
    .map((p) => ({
      email: p.email,
      name: p.name || "",
      phone: p.phone || "",
      joinedAt: p.createdAt?.toISOString?.() || null,
      hasOrdered: true,
    }));

  const users = [...registeredUsers, ...prebookOnlyUsers];
  const notOrdered = users.filter((u) => !u.hasOrdered).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]" style={SANS}>
      <div className="max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-2" style={SANS}>
            Admin · SIPA Nutrition
          </p>
          <h1 className="text-[clamp(28px,4vw,42px)] font-medium text-[#1C1A17] leading-tight" style={SERIF}>
            Dashboard
          </h1>
          <p className="text-[0.82rem] text-[#9A8E82] mt-1" style={SANS}>
            Live data from your MongoDB — refreshes on page load.
          </p>
        </div>

        <AdminDashboard
          totalUsers={users.length}
          totalOrders={totalOrders}
          notOrdered={notOrdered}
          users={users}
        />
      </div>
    </div>
  );
}
