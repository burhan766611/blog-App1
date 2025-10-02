import express from "express";
import isLogin from "../middlewares/isLogin.js";
import postModel from "../models/Post.js";
import userModel from "../models/User.js";

const router = express.Router();

router.post("/create", isLogin, async (req, res) => {
  try {
    const user = req.user;
    const { title, content } = req.body;

    const post = await postModel.create({
      title: title,
      content: content,
      author: user.id,
    });

    await userModel.findByIdAndUpdate(user.id, { $push: { posts: post._id } });

    const populatedPost = await postModel
      .findById(post._id)
      .populate("author", "username email");

    res.json({ success: true, message: "Done", post: populatedPost });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Failed" });
  }
});

router.get("/allPost", async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "username email");
    res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
});

router.put(`/update/:id`, isLogin, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedPost = await postModel.findByIdAndUpdate(id, {
      title: title,
      content: content,
    });
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, message: "Updated Post" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/delete/:id", isLogin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUSer = await postModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post Deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const postData = await postModel
      .findById(id)
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      })
      .populate("author", "username");
      // console.log(postData);
    res.json({ success: true, post: postData, comments: postData.comments, postAuthorId: postData.author._id });
  } catch {
    res.json({ success: false, post: null, comments: null });
  }
});

export default router;
