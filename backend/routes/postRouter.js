import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getPost,
} from "../controllers/postControllers.js";
import { protect } from "../middleware/authMiddleware.js";

import express from "express";
const router = express.Router();

router.route("/").post(protect,createPost);
router.route("/:id").patch(protect,updatePost).delete(protect,deletePost).get(protect,getPost);

router.route("/:id/like").post(protect,likePost)
router.route("/timeline/all").get(protect,getTimelinePosts)

export default router

