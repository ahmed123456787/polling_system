import express from "express";
import userRouter from "./routes/userRoute.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

app.use(express.json());
app.use("/api", userRouter);

// Global error handling middleware (must be after all routes)
app.use(globalErrorHandler);

export default app;
