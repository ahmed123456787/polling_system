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
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
