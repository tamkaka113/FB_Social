import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
export const createComment = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  req.body.user = req.user._id;
  const newComment = await Comment.create(req.body);

  await Post.updateOne({ $push: { comment: newComment._id } });
  if (!newComment) {
    throw new Error("Can not create comment");
  }
  res.status(200).json(newComment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const updatedComment = await Comment.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedComment);
});
