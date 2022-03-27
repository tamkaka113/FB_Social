import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
export const createPost = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  req.body.name = req.user.name;

  const job = await Post.create(req.body);

  res.status(200).json(job);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new Error("Can not update your post");
  }

  res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    throw new Error("Can not delete your post");
  }

  res.status(200).json("You have deleted your post");
});

export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user._id)) {
    await post.updateOne({ $push: { likes: req.user._id } });

    res.status(200).json("This post has been liked");
  } else {
    await post.updateOne({ $pull: { likes: req.user._id } });

    res.status(200).json("This post has been disliked");
  }
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id }).populate(
    "user comments",
    "username profilePicture"
  );

  if (!posts) {
    throw new Error("Can not find your post");
  }

  res.status(200).json(posts);
});

export const getTimelinePosts = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  const userPosts = await Post.find({ user: currentUser._id })
    .populate("user", "username profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user likes reply",
        select: "-password -followers -following -isAdmin",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "reply",
        populate: {
          path: "user",
          select: "-password -followers -following -isAdmin",
        },
      },
    });

  const friendPosts = await Promise.all(
    currentUser.following.map((friendId) => {
      return Post.find({ user: friendId })
        .populate("user", "username profilePicture")
        .populate({
          path: "comments",
          populate: {
            path: "user likes reply",
            select: "username _id profilePicture",
          },
        })
        .populate({
          path: "comments",
          populate: {
            path: "reply",
            populate: {
              path: "user",
              select: "username _id profilePicture",
            },
          },
        });
    })
  );

  if (req.params.id === "all") {
    res.status(200).json(userPosts.concat(...friendPosts));
  } else {
    res.status(200).json(userPosts);
  }
});
