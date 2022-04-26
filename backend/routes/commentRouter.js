import {
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  replyComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.route("/").post(protect, createComment);

router
  .route("/:id")
  .put(protect, updateComment)
  .delete(protect, deleteComment)
  .post(protect, likeComment);
router.post("/:id/reply", protect, replyComment);
export default router;
