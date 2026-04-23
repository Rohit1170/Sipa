import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("⚡ Using existing DB connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB Connected Successfully");
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw error; // important so API knows it failed
  }
}