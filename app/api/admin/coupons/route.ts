import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Coupon from "@/app/models/coupon";

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

interface CreateCouponBody {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  expiryDate: string;
  usageLimit?: number;
  isActive?: boolean;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ coupons });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body: CreateCouponBody = await req.json();
    const { code, discountType, discountValue, expiryDate, usageLimit = 0, isActive = true } = body;

    if (!code?.trim() || !discountType || !discountValue || !expiryDate) {
      return NextResponse.json(
        { error: "code, discountType, discountValue and expiryDate are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      expiryDate: new Date(expiryDate),
      usageLimit,
      isActive,
    });

    return NextResponse.json({ coupon }, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "A coupon with this code already exists." }, { status: 409 });
    }
    console.error("admin/coupons POST error:", err);
    return NextResponse.json({ error: "Failed to create coupon." }, { status: 500 });
  }
}
