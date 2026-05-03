import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ─── Toggle this to switch between test (₹1) and production (₹359) ───────────
const IS_TEST_MODE = false; // 👈 Change to false before going live

const PRICE_PER_UNIT = IS_TEST_MODE ? 100 : 35900; // 100 paise = ₹1 | 35900 paise = ₹359

export async function POST(req: NextRequest) {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
  console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);
  console.log("SECRET length:", process.env.RAZORPAY_KEY_SECRET?.length);
  try {
    const { quantity = 1 } = await req.json();

    if (!quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity." },
        { status: 400 }
      );
    }

    const amount = quantity * PRICE_PER_UNIT;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      isTestMode: IS_TEST_MODE,
    });
  } catch (err: any) {
    console.error("createOrder error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}