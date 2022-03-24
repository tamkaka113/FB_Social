import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email do not match");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { id: _id} = req.params;

  const updateUser = await User.findOneAndUpdate({ _id: _id}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateUser) {
    throw new Error("User Not Updated");
  }

  res.status(200).json({ updateUser });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User does not exist");
  }

  res.status(200).json(user);
});

export const followUser = asyncHandler(async (req, res) => {

  if (req.user._id!== req.params.id) {
    const user = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user.userId);

    if (!user.followers.includes(req.user.userId)) {
      await user.updateOne({ $push: { followers: req.user._id} });
      await currentUser.updateOne({ $push: { following: req.params.id } });

      res.status(200).json("You have followed this user");
    }

    res.status(403).json("You already follow this user");
  }

  res.status(403).json("You can not follow yourself");
});

export const unFollowUser = asyncHandler(async (req, res) => {
  if (req.user._id!== req.params.id) {
    const user = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user.userId);

    if (user.followers.includes(req.user.userId)) {
      await user.updateOne({ $pull: { followers: req.user._id} });
      await currentUser.updateOne({ $pull: { following: req.params.id } });

      res.status(200).json("You have unfollowed this user");
    }

    res.status(403).json("You do not follow this user");
  }

  res.status(403).json("you can not follow yourself");
});
