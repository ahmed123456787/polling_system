import express from "express";
import userRouter from "./routes/userRoute.js";
import responseRouter from "./routes/responseRoute.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", responseRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// Global error handling middleware (must be after all routes)
app.use(globalErrorHandler);

export default app;
