import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Review from "@/app/models/review";
import UserMeta from "@/app/models/userMeta";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId") ?? "daily-d3-k2";
    await connectDB();
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reviews.map((r: any) => ({ ...r, _id: r._id.toString() }))
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId = "daily-d3-k2", rating, body } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    if (!body?.trim() || body.trim().length < 10) {
      return NextResponse.json({ error: "Review must be at least 10 characters" }, { status: 400 });
    }
    if (body.trim().length > 1000) {
      return NextResponse.json({ error: "Review must be under 1000 characters" }, { status: 400 });
    }

    await connectDB();

    const existing = await Review.findOne({ userId: session.user.id, productId });
    if (existing) {
      return NextResponse.json(
        { error: "You have already submitted a review for this product" },
        { status: 409 }
      );
    }

    const userMeta = await UserMeta.findOne({ email: session.user.email?.toLowerCase() }).lean();
    const userName =
      (userMeta as { name?: string } | null)?.name?.trim() ||
      session.user.name?.trim() ||
      "Customer";

    const review = await Review.create({
      productId,
      userId: session.user.id,
      userName,
      rating,
      body: body.trim(),
    });

    return NextResponse.json(
      { ...review.toObject(), _id: review._id.toString() },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
