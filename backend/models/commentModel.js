import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  reply: [{
    type: mongoose.Types.ObjectId, ref: "Comment" 
}
],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Post",
  },
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);
