import catchAsync from "../utils/catchAsync.js";
import Answer from "../models/Response.js";

export const getResponses = catchAsync(async (req, res) => {
  const responses = await Answer.find();

  res.status(200).json({
    status: "success",
    data: responses,
  });
});

export const createResponse = catchAsync(async (req, res) => {
  const { answers, isAnonymous } = req.body;

  // create a new response.
  const newResponse = await Answer.create({
    answers,
    user: req.user ? req.user._id : null, // Associate with user if authenticated
    isAnonymous: isAnonymous || false, // Default to false if not provided
  });
  res.status(201).json({
    status: "success",
    data: {
      response: newResponse,
    },
  });
});
