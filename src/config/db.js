import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 3000, // Timeout after 3s instead of 30s default
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      connectTimeoutMS: 30000, // Give up initial connection after 30s
    });
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Throw the error so it can be caught by the server's error handler
    throw error;
  }
};
export default connectDB;
