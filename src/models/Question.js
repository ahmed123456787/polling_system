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

// Delete all responses when a question is deleted
QuestionSchema.pre("findOneAndDelete", async function (next) {
  const questionId = this.getFilter()["_id"];
  const question = await mongoose.model("Question").findById(questionId);

  if (question && question.responses.length > 0) {
    await Response.deleteMany({ _id: { $in: question.responses } });
  }
  next();
});

// Also handle the remove method
QuestionSchema.pre("remove", async function (next) {
  if (this.responses.length > 0) {
    await Response.deleteMany({ _id: { $in: this.responses } });
  }
  next();
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
