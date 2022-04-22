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

  if (!user) {
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
    profilePicture: user.profilePicture,
    following: user.following,
    followers: user.followers,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Invalid email and password");
  }

  const newEmail = email.toLowerCase();
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email does not match");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      profilePicture: user.profilePicture,
      following: user.following,
      followers: user.followers,
    });
  } else {
    throw new Error("Password does not match");
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updateUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateUser) {
    throw new Error("User Not Updated");
  }

  res.status(200).json(updateUser);
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new Error("User does not exist");
  }

  const { isAdmin, ...others } = user._doc;

  res.status(200).json({
    ...others,
  });
});

export const getRecommendedFriends = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  const users = await User.find({});

  const newUsers = users.filter(
    (user) => !currentUser.following.includes(user._id)
  );

  res.status(200).json(newUsers);
});

export const getUsers = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User Not Found");
  }

  const { password, updatedAt, ...other } = user._doc;

  res.status(200).json(other);
});

export const getFriendList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User does not exist");
  }

  const friends = await Promise.all(
    user.following.map((friendId) => {
      return User.findById(friendId);
    })
  );
  if (!friends) {
    throw new Error("No friends have found");
  }

  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });

  res.status(200).json(friendList);
});

export const followUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    const user = await User.findById(req.params.id);

    let currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(req.params.id)) {
      await user.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { following: req.params.id } });

      res.status(200).json("You have followed this user");
    }

    res.status(403).json("You already follow this user");
  }

  res.status(403).json("You can not follow yourself");
});

export const unFollowUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    const user = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });

      res.status(200).json("You have unfollowed this user");
    } else {
      res.status(403).json("You do not follow this user");
    }
  }

  res.status(403).json("you can not follow yourself");
});
