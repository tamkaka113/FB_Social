import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getPosts,
} from "../controllers/postControllers.js";
import { protect } from "../middleware/authMiddleware.js";

import express from "express";
const router = express.Router();

router.route("/").post(protect,createPost);
router.route("/:id").patch(protect,updatePost).delete(protect,deletePost).get(protect,getPosts);

router.route("/timeline/:id").get(protect,getTimelinePosts)
router.route("/:id/like").post(protect,likePost)

export default router

