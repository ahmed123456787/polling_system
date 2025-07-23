import { response } from "express";
import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  questionType: {
    enum: ["text", "multipleChoice", "rating"],
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
  },
  responseCount: {
    type: Number,
    default: 0,
  },
  userCreated: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
      default: [],
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
