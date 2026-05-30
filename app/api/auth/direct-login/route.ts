import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import { connectDB } from "@/app/lib/db";
import PendingRegistration from "@/app/models/pendingRegistration";
import UserMeta from "@/app/models/userMeta";

const ADMIN_ALIAS = "admin101@sipa.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const normalizedEmail = email.toLowerCase().trim();
    const client = await clientPromise;
    const db = client.db();

    const realAdminEmail = process.env.EMAIL_USER!.toLowerCase();

    // Block the public contact email — only the alias can log in as admin
    if (normalizedEmail === realAdminEmail) {
      return NextResponse.json({ error: "no_account" }, { status: 404 });
    }

    let user;
    let isAdmin = false;

    if (normalizedEmail === ADMIN_ALIAS) {
      // Secret alias — upsert the real admin user and log in as them
      isAdmin = true;
      user = await db.collection("users").findOneAndUpdate(
        { email: realAdminEmail },
        { $setOnInsert: { email: realAdminEmail, emailVerified: new Date(), createdAt: new Date() } },
        { upsert: true, returnDocument: "after" }
      );
    } else {
      user = await db.collection("users").findOne({ email: normalizedEmail });
      if (!user) {
        return NextResponse.json({ error: "no_account" }, { status: 404 });
      }
    }

    if (!user) return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });

    // Create a session exactly as NextAuth's MongoDB adapter does
    const sessionToken = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await db.collection("sessions").insertOne({
      sessionToken,
      userId: new ObjectId(user._id),
      expires,
    });

    const isSecure = process.env.NODE_ENV === "production";
    const cookieName = isSecure
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

    // Finalize pending registration → move name/phone into UserMeta
    await connectDB();
    const pending = await PendingRegistration.findOne({ email: normalizedEmail });
    if (pending) {
      await UserMeta.findOneAndUpdate(
        { email: normalizedEmail },
        { name: pending.name, phone: pending.phone },
        { upsert: true, new: true }
      );
      await PendingRegistration.deleteOne({ email: normalizedEmail });
    }

    const response = NextResponse.json({ success: true, isAdmin });
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
