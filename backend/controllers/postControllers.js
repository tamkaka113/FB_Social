import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
export const createPost = asyncHandler(async (req, res) => {
    req.body.user = req.user._id
    req.body.name = req.user.name

  const job = await Post.create(req.body)

  res.status(200).json(job);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new Error('Can not update your post');
  }


  res.status(200).json(post);
});


export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      throw new Error('Can not delete your post');
    }
  
  
    res.status(200).json('You have deleted your post');
  });


export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if(!post.likes.includes(req.user._id)) {
      await post.updateOne({$push:{likes:req.user._id}})

      res.status(200).json('This post has been liked')
  } else {

      await post.updateOne({$pull:{likes:req.user._id}})
    
      res.status(200).json('This post has been disliked')
  }


  });
  

  export const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new Error('Can not find your post');
    }
  
  
    res.status(200).json(post);
  });
  

export const getTimelinePosts = asyncHandler(async (req, res) => {

const currentUser = await User.findById(req.user._id)
 const userPosts =await Post.find({user:req.user._id})
if(!userPosts) {
    throw new Error ('You do not have any post')
}
const friendPosts = await Promise.all(
    currentUser.following.map(friendId => {
        return Post.find({user:friendId})
    })
)

if(!friendPosts) {
    throw new Error ('Your friends do not have ant post')
}

res.status(200).json(userPosts.concat(...friendPosts))


  });
  