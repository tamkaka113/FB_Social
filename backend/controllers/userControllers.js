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

export const getUserProfile = asyncHandler(async (req, res) => {


  const user = await User.findById(req.params.id)

  if (!user) {
    throw new Error("User does not exist");
  }

   res.status(200).json({
     _id: user._id,
     username: user.username,
     email: user.email,
   });

});
