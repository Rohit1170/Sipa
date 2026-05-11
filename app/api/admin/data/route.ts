import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import UserMeta from "@/app/models/userMeta";
import Prebook from "@/app/models/prebook";

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const [allPaidPrebooks, userMetas, totalOrders] = await Promise.all([
    Prebook.find({ status: "paid" }).lean(),
    UserMeta.find({}).sort({ createdAt: -1 }).lean(),
    Prebook.countDocuments({ status: "paid" }),
  ]);

  const orderedSet = new Set((allPaidPrebooks as any[]).map((p) => p.email?.toLowerCase()));
  const metaEmailSet = new Set((userMetas as any[]).map((m) => m.email?.toLowerCase()));

  const registeredUsers = (userMetas as any[]).map((m) => ({
    email: m.email,
    name: m.name || "",
    phone: m.phone || "",
    joinedAt: m.createdAt || null,
    hasOrdered: orderedSet.has(m.email?.toLowerCase()),
  }));

  const prebookOnlyUsers = (allPaidPrebooks as any[])
    .filter((p) => !metaEmailSet.has(p.email?.toLowerCase()))
    .map((p) => ({
      email: p.email,
      name: p.name || "",
      phone: p.phone || "",
      joinedAt: p.createdAt || null,
      hasOrdered: true,
    }));

  const users = [...registeredUsers, ...prebookOnlyUsers];

  return NextResponse.json({
    totalUsers: users.length,
    totalOrders,
    notOrdered: users.filter((u) => !u.hasOrdered).length,
    users,
  });
}
