import { protect } from "../middleware/authMiddleware.js";
import {
  createConversation,
  getConversations,
  getConversationByUserId,
} from "../controllers/conversationController.js";
import express from "express";
const router = express.Router();

router.route("/").post(protect, createConversation);
router.route("/:id").get(protect, getConversations);
router.route("/:currentId/c/:id").get(protect, getConversationByUserId);

export default router;
