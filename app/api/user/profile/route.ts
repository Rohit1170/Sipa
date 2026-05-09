import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Prebook from "@/app/models/prebook";
import UserMeta from "@/app/models/userMeta";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const [prebook, userMeta] = await Promise.all([
    Prebook.findOne({ email: session.user.email }).lean(),
    UserMeta.findOne({ email: session.user.email }).lean(),
  ]);

  const p = prebook as any;
  const m = userMeta as any;

  return NextResponse.json({
    name: p?.name || m?.name || "",
    email: session.user.email,
    phone: p?.phone || m?.phone || "",
    address1: p?.address1 || "",
    address2: p?.address2 || "",
    city: p?.city || "",
    state: p?.state || "",
    pincode: p?.pincode || "",
    prebook: p
      ? {
          status: p.status,
          quantity: p.totalQuantity || p.quantity || 1,
          totalAmountPaid: p.totalAmountPaid || (p.quantity || 1) * 359,
          createdAt: p.createdAt,
        }
      : null,
  });
}
