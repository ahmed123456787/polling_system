import express from "express";
import userRouter from "./routes/userRoute.js";
import responseRouter from "./routes/responseRoute.js";
import globalErrorHandler from "./controllers/errorController.js";
import pollRouter from "./routes/pollRoute.js";
import questionRouter from "./routes/questionRoute.js";

const app = express();

app.use(express.json());
// Serve static files from the public directory
app.use(express.static("public"));

app.use("/api", userRouter);
app.use("/api", responseRouter);
app.use("/api", pollRouter);
app.use("/api", questionRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// Global error handling middleware (must be after all routes)
app.use(globalErrorHandler);

export default app;
