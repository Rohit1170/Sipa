import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Prebook from "@/app/models/prebook";
import path from "path";
import fs from "fs";
import { sendMail } from "@/app/lib/sendMail";

const PRICE_PER_UNIT = 349;
const ORIGINAL_PRICE = 399;

// --- Cache template (important for performance & serverless) ---
const templatePath = path.join(
  process.cwd(),
  "app/templates/preBooking.html"
);
const baseTemplate = fs.readFileSync(templatePath, "utf8");

// --- Basic HTML sanitizer ---
const escapeHTML = (str: string) =>
  str.replace(/[&<>"']/g, (tag) => {
    const chars: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return chars[tag] || tag;
  });

interface PrebookRequestBody {
  name: string;
  email: string;
  phone: string;
  quantity?: number;
  address1: string;
  address2?: string;
  pincode: string;
  city: string;
  state: string;
  notes?: string;
  consent: boolean;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body: PrebookRequestBody = await req.json();

    const {
      name,
      email,
      phone,
      quantity = 1,
      address1,
      address2,
      pincode,
      city,
      state,
      notes,
      consent,
    } = body;

    // --- Validation ---
    if (
      !name ||
      !email ||
      !phone ||
      !address1 ||
      !pincode ||
      !city ||
      !state ||
      !consent
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity." },
        { status: 400 }
      );
    }

    const totalAmount = PRICE_PER_UNIT * quantity;
    const savings = ORIGINAL_PRICE * quantity - totalAmount;

    const fullAddress = `${address1}${address2 ? ", " + address2 : ""}, ${city}, ${state} - ${pincode}`;

    const adminEmail = process.env.EMAIL_USER;

    if (!adminEmail) {
      throw new Error("Email credentials are not configured in .env.local");
    }

    // --- Save to DB ---
    const prebook = await Prebook.create({
      name,
      email,
      phone,
      quantity,
      address1,
      address2,
      pincode,
      city,
      state,
      notes,
      consent,
      status: "pending",
    });

    const orderId = (prebook._id as string).toString();

    // --- Prepare email template ---
    let htmlTemplate = baseTemplate
      .replace(/{{\s*name\s*}}/g, escapeHTML(name))
      .replace(/{{\s*email\s*}}/g, escapeHTML(email))
      .replace(/{{\s*quantity\s*}}/g, quantity.toString())
      .replace(/{{\s*pricePerUnit\s*}}/g, PRICE_PER_UNIT.toString())
      .replace(/{{\s*totalAmount\s*}}/g, totalAmount.toString())
      .replace(/{{\s*savings\s*}}/g, savings.toString())
      .replace(/{{\s*orderId\s*}}/g, orderId)
      .replace(/{{\s*address\s*}}/g, escapeHTML(fullAddress));

    // --- Send emails safely ---
    const emailResults = await Promise.allSettled([
      // User email
      sendMail({
        to: email,
        subject: "🎉 Your Pre-Booking is Confirmed!",
        html: htmlTemplate,
      }),

      // Admin email
      sendMail({
        to: adminEmail,
        subject: "🛒 New Pre-Booking Received",
        html: `
          <div style="font-family:Arial;padding:20px;">
            <h2 style="color:#c2410c;">🛒 New Pre-Booking Received</h2>

            <p><strong>Name:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
            <p><strong>Savings:</strong> ₹${savings}</p>
            <p><strong>Address:</strong> ${escapeHTML(fullAddress)}</p>
            ${notes ? `<p><strong>Notes:</strong> ${escapeHTML(notes)}</p>` : ""}

            <hr style="margin:20px 0;" />
            <p>🆔 Order ID: <strong>${orderId}</strong></p>
          </div>
        `,
      }),
    ]);

    // --- Log email failures (but don’t break API) ---
    emailResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Email failed:", result.reason);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pre-booking confirmed! Check your email.",
        orderId,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Prebook error:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}