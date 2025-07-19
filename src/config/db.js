import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
