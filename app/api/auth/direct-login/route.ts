import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { randomBytes } from "crypto";
import { ObjectId } from "mongodb"; // FIX 1

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const normalizedEmail = email.toLowerCase().trim();
    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json({ error: "no_account" }, { status: 404 });
    }

    // Create a session exactly as NextAuth's MongoDB adapter does
    const sessionToken = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await db.collection("sessions").insertOne({
      sessionToken,
      userId: new ObjectId(user._id), // FIX 1: store as ObjectId, not string
      expires,
    });

    // FIX 2: use NODE_ENV instead of x-forwarded-proto
    const isSecure = process.env.NODE_ENV === "production";
    const cookieName = isSecure
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

    const response = NextResponse.json({ success: true });
    response.cookies.set(cookieName, sessionToken, {
      expires,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Direct login error:", err);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
