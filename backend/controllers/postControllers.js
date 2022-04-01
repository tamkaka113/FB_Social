import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import { v2 as cloudinary } from "cloudinary";
export const createPost = asyncHandler(async (req, res) => {
  const {image,desc} =req.body

  if(!image && !desc) {
    throw new Error('Need an image or description')
  }
  const post = await Post.create({
    user:req.user._id,
    image,
    desc
  });

  res.status(200).json(post);
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


 export const uploadNewImages = asyncHandler(async (req, res) => {
 

  const imageLinks =[]

   const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
     {
       use_filename: true,
       folder: "upload-image2",
     }
   )
   imageLinks.push(result.secure_url)
   
  
  res.status(200).json(result.secure_url) 
}) 



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
  const userPosts = await Post.find({ user: currentUser._id }).sort('-createdAt')
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
      return Post.find({ user: friendId }).sort('-createdAt')
        .populate("user", "username profilePicture createdAt")
        .populate({
          path: "comments",
          populate: {
            path: "user likes reply",
            select: "username _id profilePicture createdAt",
          },
        })
        .populate({
          path: "comments",
          populate: {
            path: "reply",
            populate: {
              path: "user",
              select: "username _id profilePicture createdAt",
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
