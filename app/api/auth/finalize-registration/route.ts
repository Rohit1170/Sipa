import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PendingRegistration from "@/app/models/pendingRegistration";
import UserMeta from "@/app/models/userMeta";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const normalizedEmail = email.toLowerCase().trim();
    await connectDB();

    const pending = await PendingRegistration.findOne({ email: normalizedEmail });
    if (!pending) {
      // No pending record — user logged in directly, nothing to finalize
      return NextResponse.json({ success: true, skipped: true });
    }

    await UserMeta.findOneAndUpdate(
      { email: normalizedEmail },
      { name: pending.name, phone: pending.phone },
      { upsert: true, new: true }
    );

    await PendingRegistration.deleteOne({ email: normalizedEmail });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Finalize registration error:", err);
    return NextResponse.json({ error: "Failed to finalize registration" }, { status: 500 });
  }
}
