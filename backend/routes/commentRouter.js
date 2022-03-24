import {
createComment,
updateComment
  } from "../controllers/commentController.js";
  import { protect } from "../middleware/authMiddleware.js";
  import express from "express";
  const router = express.Router();


  router.route('/').post(protect,createComment)
  
  router.route('/:id').post(protect,updateComment)
  export default router