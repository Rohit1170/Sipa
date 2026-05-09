import mongoose from "mongoose";

const userMetaSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UserMeta ||
  mongoose.model("UserMeta", userMetaSchema);
