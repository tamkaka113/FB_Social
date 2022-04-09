import { protect } from "../middleware/authMiddleware.js";
import { addMessages,getMessages } from "../controllers/messageController.js";
import express from "express";
const router = express.Router();



router.route("/").post( addMessages);
router.route("/:id").get(protect, getMessages);

export default router;
