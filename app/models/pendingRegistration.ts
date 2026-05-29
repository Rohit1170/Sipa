import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  name:  { type: String, required: true },
  phone: { type: String, default: "" },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h TTL
  },
});

// MongoDB auto-deletes documents once expiresAt is reached
pendingRegistrationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PendingRegistration ||
  mongoose.model("PendingRegistration", pendingRegistrationSchema);
