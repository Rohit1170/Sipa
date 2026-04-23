import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notify ||
  mongoose.model("Notify", notifySchema);