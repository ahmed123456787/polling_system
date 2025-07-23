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
      default: [],
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Poll = mongoose.model("Poll", PollSchema);
export default Poll;
