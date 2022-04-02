import {
  login,
  register,
  getUserProfile,
  updateProfile,
  followUser,
  unFollowUser,
  getFriendList,
  getRecommendedFriends
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.get("/",protect, getRecommendedFriends);
router.post("/register", register);
router.post("/login", login);
router.route("/:id").get(protect, getUserProfile).patch(protect,updateProfile);
router.route("/:id/follow").put(protect,followUser)
router.route("/:id/unfollow").put(protect,unFollowUser)

router.route("/friends/:id").get(protect,getFriendList)

export default router;
