import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      require: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel",
      },
    ],
  },
  { timestamps: true }
);

const postModel = mongoose.model("postModel", postSchema);

export default postModel;
