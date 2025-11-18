import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
