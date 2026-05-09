import mongoose from "mongoose";

const prebookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    quantity: { type: Number, default: 1 },

    address1: { type: String, required: true },
    address2: { type: String },

    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },

    notes: { type: String },

    consent: { type: Boolean, required: true },

    status: {
      type: String,
      default: "pending",
    },

    totalQuantity: { type: Number, default: 0 },
    totalAmountPaid: { type: Number, default: 0 },

    payments: [
      {
        razorpayOrderId: String,
        razorpayPaymentId: String,
        quantity: Number,
        amount: Number,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Prebook ||
  mongoose.model("Prebook", prebookSchema);