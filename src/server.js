import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

//  Load environment variables
dotenv.config(path.resolve(process.cwd(), "../.env"));
let server;
try {
  await connectDB();
  console.log("Database connection successful");

  server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

  // Initialize WebSocket server
  import("./webSocket.js").then((module) => {
    const { initWebSocket } = module;
    const io = initWebSocket(server);
    console.log("WebSocket server initialized");
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
  process.exit(1);
}

export default server;
