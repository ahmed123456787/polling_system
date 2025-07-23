import Question from "../models/Question.js";
import Poll from "../models/Poll.js";
import catchAsync from "../utils/catchAsync.js";

export const getQuestions = catchAsync(async (req, res) => {
  const pollId = req.params.pollId;
  const poll = await Poll.findById(pollId).populate("questions");

  res.status(200).json({
    status: "success",
    data: {
      questions: poll.questions,
    },
  });
});

export const createQuestion = catchAsync(async (req, res) => {
  const { pollId } = req.params;

  req.body.userCreated = req.user._id;
  req.body.poll = pollId;

  const { questionType, questionText, options } = req.body;
  const newQuestion = await Question.create(req.body);

  // After creating the question, associate it with the poll
  const poll = await Poll.findById(pollId);
  poll.questions.push(newQuestion._id);
  await poll.save();
  res.status(201).json({
    status: "success",
    data: {
      question: newQuestion,
    },
  });
});
