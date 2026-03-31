import mongoose from "mongoose";

// Cache connection across serverless invocations (Vercel warm containers reuse this)
let isConnected = false;

export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return; // Already connected — reuse existing connection
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};
