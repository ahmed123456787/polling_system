import mongoose, { Schema } from "mongoose";
import validator from "validator";

const ResponseSchema = new Schema(
  {
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      email: {
        type: String,
        required: function () {
          return this.isAnonymous === false; // Only require email if not anonymous
        },
        validate: [validator.isEmail, "Please provide a valid email address"],
      },
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Response", ResponseSchema);

export default Answer;
