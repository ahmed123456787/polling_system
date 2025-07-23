import catchAsync from "../utils/catchAsync.js";
import Answer from "../models/Response.js";
import { getOne, deleteOne, updateOne } from "./factory.js";
import { getIO } from "../utils/webSocketState.js";

export const getResponses = catchAsync(async (req, res) => {
  const responses = await Answer.find();

  res.status(200).json({
    status: "success",
    data: responses,
  });
});

export const createResponse = catchAsync(async (req, res) => {
  const pollId = req.params.pollId;
  const { answers, isAnonymous } = req.body;

  // create a new response.
  const newResponse = await Answer.create({
    answers,
    user: req.user ? req.user._id : null,
    isAnonymous: isAnonymous || false,
  });

  // Emit the new response to all connected clients
  try {
    const io = getIO();
    io.to(`poll_${pollId}`).emit("newResponse", newResponse);
  } catch (err) {
    console.warn("WebSocket notification failed:", err.message);
    // Continue processing even if WebSocket notification fails
  }

  res.status(201).json({
    status: "success",
    data: {
      response: newResponse,
    },
  });
});

export const getResponseById = getOne(Answer);
export const updateResponse = updateOne(Answer);
export const deleteResponse = deleteOne(Answer);
