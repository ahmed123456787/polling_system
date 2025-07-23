import mongoose, { Schema } from "mongoose";
import Question from "./Question.js";

const PollSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      default: [],
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PollSchema.pre("findOneAndDelete", async function (next) {
  // 'this' is the query, not the document
  const pollId = this.getFilter()["_id"];
  const poll = await mongoose.model("Poll").findById(pollId);

  if (poll && poll.questions.length > 0) {
    await Question.deleteMany({ _id: { $in: poll.questions } });
  }
  next();
});

PollSchema.pre("remove", async function (next) {
  // 'this' is the document being removed
  if (this.questions.length > 0) {
    await Question.deleteMany({ _id: { $in: this.questions } });
  }
  next();
});

const Poll = mongoose.model("Poll", PollSchema);
export default Poll;
