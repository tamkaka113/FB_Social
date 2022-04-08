
  import { protect } from "../middleware/authMiddleware.js";
  import {createConversation,getConversations} from '../controllers/conversationController.js'
  import express from "express";
  const router = express.Router();
  
  router.route("/").post(protect,createConversation);
  router.route("/:id").get(protect,getConversations);
  

  export default router;
  