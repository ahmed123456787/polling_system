import Poll from "../models/Poll.js";
import catchAsync from "../utils/catchAsync.js";
import { getOne, deleteOne, updateOne } from "./factory.js";

export const getPolls = catchAsync(async (req, res) => {
  const user = req.user._id;
  const polls = await Poll.find({ creator: user }).populate(
    "creator",
    "name email"
  );

  res.status(200).json({
    status: "success",
    data: {
      polls,
    },
  });
});

export const createPoll = catchAsync(async (req, res) => {
  // Set creator from authenticated user
  req.body.creator = req.user._id;

  return factory.createOne(Poll)(req, res);
});

export const getPollById = getOne(Poll, {
  path: "creator",
  select: "name email",
});

export const updatePoll = updateOne(Poll);
export const deletePoll = deleteOne(Poll);
