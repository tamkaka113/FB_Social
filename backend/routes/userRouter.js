import { login,register,getUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router =express.Router()

router.post('/register',register)
router.post('/login',login)
router.route('/:id').get(protect,getUserProfile)
export default router