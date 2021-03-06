import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getPosts,
  uploadNewImages,
} from "../controllers/postControllers.js";
import { protect } from "../middleware/authMiddleware.js";

import express from "express";
import { getRecommendedFriends } from "../controllers/userControllers.js";
const router = express.Router();
router.route("/uploads").post(uploadNewImages);
router.route("/").post(protect, createPost).get(protect, getRecommendedFriends);
router
  .route("/:id")
  .patch(protect, updatePost)
  .delete(protect, deletePost)
  .get(protect, getPosts);

router.route("/timeline/:id").get(protect, getTimelinePosts);
router.route("/:id/like").post(protect, likePost);

export default router;
