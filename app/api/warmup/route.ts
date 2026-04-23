import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";

export async function GET() {
  try {
    await connectDB();
    console.log("🔥 DB Warmed Up");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}