import { error } from "console";
import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

//  Load environment variables
dotenv.config(path.resolve(process.cwd(), "../.env"));

// Connect to the database
try {
  await connectDB();
  console.log("Database connection successful");

  // Only start server if database connection is successful
  const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.name, err.message);
    console.log("Shutting down server...");
    server.close(() => {
      process.exit(1); // Exit with failure
    });
  });
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exit(1); // Exit the process with failure
}

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.name, err.message);
  process.exit(1); // Exit the process with failure
});
