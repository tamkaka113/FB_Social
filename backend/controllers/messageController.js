import Message from "../models/message.js";
import asyncHandler from "express-async-handler";

export const addMessages = asyncHandler(async (req, res) => {
  const newMessage = new Message(req.body);

  if (!newMessage) {
    throw new Error("Cannot create message");
  }

  const saveMessage = await newMessage.save();
  if (!saveMessage) {
    throw new Error("Cannot create message");
  }

  res.status(200).json(saveMessage);
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.id,
  }).populate("sender", "username profilePicture");

  if (!messages) {
    throw new Error("Cannot find messages");
  }

  res.status(200).json(messages);
});
