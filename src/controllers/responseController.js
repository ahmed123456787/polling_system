import catchAsync from "../utils/catchAsync.js";
import Answer from "../models/Response.js";

export const getResponses = catchAsync(async (req, res, next) => {
  const responses = await Answer.find();

  res.status(200).json({
    status: "success",
    data: responses,
  });
});
