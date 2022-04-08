import Conversation from "../models/Conversation.js";
import asyncHandler from "express-async-handler";

export const createConversation = asyncHandler(async (req, res) => {


    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.recieverId]
    })

    if(!newConversation) {
        throw new Error('Can not create a conversation')
    }

  const saveConversation =await newConversation.save()

  res.status(200).json(saveConversation)

});


export const getConversations = asyncHandler(async (req, res) => {


  const conversation = await  Conversation.find({
      members:{$in:[req.params.id]}
  })

 if(!conversation) {
     throw new Error('No conversation found')
 }

res.status(200).json(conversation)

});