import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

//  Load environment variables
dotenv.config(path.resolve(process.cwd(), "../.env"));

// Connect to the database
await connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
