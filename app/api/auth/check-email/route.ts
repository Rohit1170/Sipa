import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
  if (!email) return NextResponse.json({ exists: false });

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  return NextResponse.json({ exists: !!user });
}
