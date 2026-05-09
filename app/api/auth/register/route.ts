import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import UserMeta from "@/app/models/userMeta";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if a NextAuth user already exists for this email
    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "account_exists" },
        { status: 409 }
      );
    }

    await connectDB();

    await UserMeta.findOneAndUpdate(
      { email: normalizedEmail },
      { name: name.trim(), phone: phone?.trim() || "" },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}
