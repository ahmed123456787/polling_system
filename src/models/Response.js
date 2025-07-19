import mongoose, { Schema } from "mongoose";

const ResponseSchema = new Schema(
  {
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, 
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;
