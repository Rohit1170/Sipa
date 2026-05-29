import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Review from "@/app/models/review";

function isAdmin(email?: string | null) {
  return email?.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { rating, body } = await req.json();

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    if (body !== undefined) {
      if (body.trim().length < 10) {
        return NextResponse.json({ error: "Review must be at least 10 characters" }, { status: 400 });
      }
      if (body.trim().length > 1000) {
        return NextResponse.json({ error: "Review must be under 1000 characters" }, { status: 400 });
      }
    }

    await connectDB();
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    if (review.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (rating !== undefined) review.rating = rating;
    if (body !== undefined) review.body = body.trim();
    review.isEdited = true;

    await review.save();
    return NextResponse.json({ ...review.toObject(), _id: review._id.toString() });
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await connectDB();
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
