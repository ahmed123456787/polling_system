import mongoose, { Schema } from "mongoose";

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
      required: true,
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
});

const Poll = mongoose.model("Poll", PollSchema);
module.exports = Poll;
