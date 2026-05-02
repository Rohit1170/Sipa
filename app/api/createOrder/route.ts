import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { quantity } = await req.json();
  const amount = quantity * 34900; // ₹349 in paise

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return NextResponse.json({ orderId: order.id, amount });
}