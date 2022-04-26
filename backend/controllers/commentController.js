import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);

  const newComment = await Comment.create(req.body);
  if (!post.comments.includes(req.user._id)) {
    await post.updateOne({ $push: { comments: newComment._id } });

    res.status(200).json(newComment);
  }

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

export const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new Error("Comment does not exist");
  }
  if (!comment.likes.includes(req.user._id)) {
    await comment.updateOne({ $push: { likes: req.user._id } });
    res.status(200).json("You have liked this comment");
  } else {
    await comment.updateOne({ $pull: { likes: req.user._id } });

    res.status(200).json("You have disliked this comment");
  }
});

export const replyComment = asyncHandler(async (req, res) => {
  const newComment = await Comment.create(req.body);

  const comment = await Comment.findById(req.params.id);

  if (!comment.reply.includes(newComment._id)) {
    await comment.updateOne({ $push: { reply: newComment._id } });

    res.status(200).json(newComment);
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete({ _id: req.params.id });

  if (!comment) {
    throw new Error("You cannot delete this comment");
  }
  res.status(200).json(" you have deleted this comment");

  await Post.findOneAndUpdate({ $pull: { comment: req.user._id } });

  res.status(200).json("Deleted User Comment");
});
