import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("commentModel", commentSchema);

export default commentModel;
