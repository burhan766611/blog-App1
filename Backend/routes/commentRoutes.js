import express from "express";
import isLogin from "../middlewares/isLogin.js";
import commentModel from "../models/Comment.js";
import postModel from "../models/Post.js";

const router = express.Router();

router.post("/add/:id", isLogin, async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    const comment = await commentModel.create({
      content,
      author: userId,
      post: postId,
    });

    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    const populatedComment = await commentModel
      .findById(comment._id)
      .populate("author");

    res.json({
      success: true,
      comment: populatedComment,
      message: "Comment added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/edit/:id", isLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await commentModel.findByIdAndUpdate(
      id,
      { content: content },
      { new: true }
    );
    // console.log(updatedComment);
    if (updatedComment) {
      return res.json({ success: true, message: "Comment updated successfully" });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong , Try Again !",
      });
    }
  } catch {
    return res.json({ success: false, message: "Something went wrong , Try Again !" });
  }
});

router.delete("/delete/:id", isLogin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComments = await commentModel.findByIdAndDelete(id);

    if (!deletedComments) {
      res.json({ success: false, message: "Server Error" });
    } else {
      res.json({ success: true, message: "Comments deleted successfully" });
    }
  } catch {
    res.json({ success: false, message: "Server Error" });
  }
});

export default router;
