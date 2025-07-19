import express from "express";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api", userRouter);

// Error handler middleware
app.use(errorHandler);

export default app;
