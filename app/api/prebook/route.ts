import mongoose, { Schema, Document } from "mongoose";

// ── Individual payment entry ──────────────────────────────────────────────────
interface IPayment {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  quantity: number;
  amount: number; // in rupees
  paidAt: Date;
}

// ── Full prebook document ─────────────────────────────────────────────────────
export interface IPrebook extends Document {
  // Customer info
  name: string;
  email: string;
  phone: string;

  // Delivery
  address1: string;
  address2?: string;
  city: string;
  pincode: string;
  state: string;
  notes?: string;

  // Consent
  consent: boolean;

  // Order summary (combined across all payments)
  totalQuantity: number;
  totalAmountPaid: number; // in rupees

  // Status
  status: "paid" | "refunded" | "cancelled";

  // All payments history — one entry per Razorpay transaction
  payments: IPayment[];

  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    paidAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PrebookSchema = new Schema<IPrebook>(
  {
    // Customer
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },

    // Delivery
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    notes: { type: String },

    // Consent
    consent: { type: Boolean, required: true },

    // Combined totals (auto-updated on each payment)
    totalQuantity: { type: Number, default: 0 },
    totalAmountPaid: { type: Number, default: 0 },

    // Status
    status: {
      type: String,
      enum: ["paid", "refunded", "cancelled"],
      default: "paid",
    },

    // Full payment history
    payments: { type: [PaymentSchema], default: [] },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ── Index on email (not unique — same customer can have one record) ────────────
PrebookSchema.index({ email: 1 });

// ── Index on payment order IDs for fast idempotency lookup ───────────────────
PrebookSchema.index({ "payments.razorpayOrderId": 1 }, { unique: true, sparse: true });

export default mongoose.models.Prebook ||
  mongoose.model<IPrebook>("Prebook", PrebookSchema);