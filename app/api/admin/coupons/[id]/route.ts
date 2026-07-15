import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Coupon from "@/app/models/coupon";

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

interface UpdateCouponBody {
  code?: string;
  discountType?: "percentage" | "flat";
  discountValue?: number;
  expiryDate?: string;
  usageLimit?: number;
  isActive?: boolean;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body: UpdateCouponBody = await req.json();

    const update: Record<string, unknown> = {};
    if (body.code !== undefined) update.code = body.code.trim().toUpperCase();
    if (body.discountType !== undefined) update.discountType = body.discountType;
    if (body.discountValue !== undefined) update.discountValue = body.discountValue;
    if (body.expiryDate !== undefined) update.expiryDate = new Date(body.expiryDate);
    if (body.usageLimit !== undefined) update.usageLimit = body.usageLimit;
    if (body.isActive !== undefined) update.isActive = body.isActive;

    await connectDB();
    const coupon = await Coupon.findByIdAndUpdate(id, update, { new: true });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found." }, { status: 404 });
    }

    return NextResponse.json({ coupon });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "A coupon with this code already exists." }, { status: 409 });
    }
    console.error("admin/coupons PATCH error:", err);
    return NextResponse.json({ error: "Failed to update coupon." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await connectDB();
  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return NextResponse.json({ error: "Coupon not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
