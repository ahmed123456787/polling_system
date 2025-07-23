import Poll from "../models/Poll.js";
import Question from "../models/Question.js";
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
  req.body.creator = req.user._id;

  // Extract questions from request body
  const questionsData = req.body.questions || [];

  // Create questions first
  const questionIds = [];

  for (const questionData of questionsData) {
    questionData.userCreated = req.user._id;
    const question = await Question.create(questionData);
    questionIds.push(question._id);
  }

  req.body.questions = questionIds;

  const poll = await Poll.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      poll,
    },
  });
});
export const getPollById = getOne(Poll, {
  path: "creator",
  select: "name email",
});

export const updatePoll = updateOne(Poll);
export const deletePoll = deleteOne(Poll);
