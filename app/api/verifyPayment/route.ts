import crypto from "crypto";
import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Prebook from "@/app/models/prebook";
import Coupon from "@/app/models/coupon";
import { MRP_PER_UNIT } from "@/app/lib/coupon";
import path from "path";
import fs from "fs";
import { sendMail } from "@/app/lib/sendMail";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const templatePath = path.join(process.cwd(), "app/templates/preBooking.html");
const baseTemplate = fs.readFileSync(templatePath, "utf8");

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

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  quantity: number;
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

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerData,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      customerData: CustomerData;
    } = await req.json();

    // ── 1. Verify Razorpay signature (always first) ───────────────────────────
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature." },
        { status: 400 }
      );
    }

    const {
      name, email, phone,
      quantity = 1,
      address1, address2,
      pincode, city, state,
      notes, consent,
    } = customerData;

    // ── Trusted source for amount + promo used: the Razorpay order itself ─────
    // (never trust a client-resubmitted promoCode/discount for money or usage counts)
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    const amountPaid = Number(razorpayOrder.amount) / 100;
    const appliedCouponCode = String(razorpayOrder.notes?.promoCode || "");
    const discountAmount = Number(razorpayOrder.notes?.discountAmount || 0);

    // ── 2. Idempotency — has this exact Razorpay order been saved already? ────
    // Handles: browser crash, page refresh, double API call for same payment
    const existingByOrderId = await Prebook.findOne({
      "payments.razorpayOrderId": razorpay_order_id,
    });

    if (existingByOrderId) {
      console.log(`Idempotent: order ${razorpay_order_id} already processed`);
      const existingPayment = existingByOrderId.payments.find(
        (p: { razorpayOrderId: string; amount: number }) => p.razorpayOrderId === razorpay_order_id
      );
      return NextResponse.json(
        {
          success: true,
          message: "Payment already confirmed!",
          orderId: existingByOrderId._id.toString(),
          amountPaid: existingPayment?.amount ?? existingByOrderId.totalAmountPaid,
          totalQuantity: existingByOrderId.totalQuantity,
          totalAmountPaid: existingByOrderId.totalAmountPaid,
        },
        { status: 200 }
      );
    }

    // ── 3. Find existing customer record by email ─────────────────────────────
    const existingCustomer = await Prebook.findOne({ email });

    let prebook;
    let isReturningCustomer = false;

    if (existingCustomer) {
      // ── Returning customer — add payment to their record ──────────────────
      isReturningCustomer = true;

      prebook = await Prebook.findByIdAndUpdate(
        existingCustomer._id,
        {
          // Update delivery details with latest (they may have changed address)
          name,
          phone,
          address1,
          address2,
          pincode,
          city,
          state,
          notes,
          status: "paid",

          // Add new payment to history
          $push: {
            payments: {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              quantity,
              amount: amountPaid,
              couponCode: appliedCouponCode || undefined,
              discountAmount,
              paidAt: new Date(),
            },
          },

          // Increment combined totals
          $inc: {
            totalQuantity: quantity,
            totalAmountPaid: amountPaid,
          },
        },
        { new: true } // return updated document
      );

    } else {
      // ── New customer — create fresh record ────────────────────────────────
      prebook = await Prebook.create({
        name, email, phone,
        address1, address2,
        pincode, city, state,
        notes, consent,
        status: "paid",
        totalQuantity: quantity,
        totalAmountPaid: amountPaid,
        payments: [
          {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            quantity,
            amount: amountPaid,
            couponCode: appliedCouponCode || undefined,
            discountAmount,
            paidAt: new Date(),
          },
        ],
      });
    }

    // ── Best-effort: increment coupon usage only after a successful, paid order ──
    // Guarded so concurrent checkouts can't push usedCount past usageLimit.
    if (appliedCouponCode) {
      try {
        await Coupon.findOneAndUpdate(
          {
            code: appliedCouponCode,
            $or: [{ usageLimit: 0 }, { $expr: { $lt: ["$usedCount", "$usageLimit"] } }],
          },
          { $inc: { usedCount: 1 } }
        );
      } catch (err) {
        console.error("Coupon usage increment failed:", err);
      }
    }

    const orderId = prebook!._id.toString();
    const fullAddress = `${address1}${address2 ? ", " + address2 : ""}, ${city}, ${state} - ${pincode}`;
    const adminEmail = process.env.EMAIL_USER!;
    const mrpTotal = MRP_PER_UNIT * quantity; // ₹599 × qty (crossed out in email)

    const mrpCrossedOutHtml =
      discountAmount > 0
        ? `<p style="margin: 0; font-size: 11px; color: #9a8e82; text-decoration: line-through;">₹${mrpTotal}</p>`
        : "";

    const promoRowHtml = appliedCouponCode
      ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0eae0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size: 12px; color: #1c6b3a; font-weight: 600;">
                  🎉 Promo (${escapeHTML(appliedCouponCode)}) applied
                </td>
                <td align="right" style="font-size: 12px; color: #1c6b3a; font-weight: 600;">
                  − ₹${discountAmount}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
      : "";

    // ── 4. Send confirmation emails ───────────────────────────────────────────
    let htmlTemplate = baseTemplate
      .replace(/{{\s*name\s*}}/g, escapeHTML(name))
      .replace(/{{\s*email\s*}}/g, escapeHTML(email))
      .replace(/{{\s*quantity\s*}}/g, quantity.toString())
      .replace(/{{\s*mrpPerUnit\s*}}/g, MRP_PER_UNIT.toString())
      .replace(/{{\s*totalAmount\s*}}/g, amountPaid.toString())
      .replace(/{{\s*promoRowHtml\s*}}/g, promoRowHtml)
      .replace(/{{\s*mrpCrossedOutHtml\s*}}/g, mrpCrossedOutHtml)
      .replace(/{{\s*mrpTotal\s*}}/g, mrpTotal.toString())
      .replace(/{{\s*orderId\s*}}/g, orderId)
      .replace(/{{\s*address\s*}}/g, escapeHTML(fullAddress));

    const emailResults = await Promise.allSettled([
      // Customer email
      sendMail({
        to: email,
        subject: isReturningCustomer
          ? "🎉 Additional Order Confirmed — Your Order is Updated!"
          : "🎉 Payment Confirmed — Your Order is Locked In!",
        html: htmlTemplate,
      }),

      // Admin email
      sendMail({
        to: adminEmail,
        subject: isReturningCustomer
          ? "🔄 Returning Customer — Order Updated"
          : "💰 New Order Received",
        html: `
          <div style="font-family:Arial;padding:20px;">
            <h2 style="color:#c2410c;">
              ${isReturningCustomer ? "🔄 Returning Customer Order" : "💰 New Order"}
            </h2>
            ${isReturningCustomer ? `
              <div style="background:#fef3c7;padding:12px;border-radius:6px;margin-bottom:16px;">
                <strong>⚠️ Returning customer</strong> — 
                Total quantity now: <strong>${prebook!.totalQuantity} packs</strong> | 
                Total paid: <strong>₹${prebook!.totalAmountPaid}</strong>
              </div>
            ` : ""}
            <p><strong>Name:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
            <p><strong>This Order — Quantity:</strong> ${quantity} pack(s)</p>
            <p><strong>This Order — Amount:</strong> ₹${amountPaid}</p>
            <p><strong>Delivery Address:</strong> ${escapeHTML(fullAddress)}</p>
            ${notes ? `<p><strong>Notes:</strong> ${escapeHTML(notes)}</p>` : ""}
            <hr style="margin:20px 0;" />
            <p>🆔 DB Customer ID: <strong>${orderId}</strong></p>
            <p>💳 Razorpay Payment ID: <strong>${razorpay_payment_id}</strong></p>
            <p>📦 Razorpay Order ID: <strong>${razorpay_order_id}</strong></p>
          </div>
        `,
      }),
    ]);

    emailResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Email failed:", result.reason);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: isReturningCustomer
          ? "Order updated successfully!"
          : "Payment verified and order confirmed!",
        orderId,
        amountPaid,
        totalQuantity: prebook!.totalQuantity,
        totalAmountPaid: prebook!.totalAmountPaid,
        isReturningCustomer,
      },
      { status: isReturningCustomer ? 200 : 201 }
    );

  } catch (err: any) {
    console.error("VerifyPayment error:", err);

    // Duplicate payment index race condition
    if (err.code === 11000) {
      return NextResponse.json(
        {
          success: true,
          message: "Payment confirmed!",
          orderId: "ref-" + Date.now(),
        },
        { status: 200 }
      );
    }

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