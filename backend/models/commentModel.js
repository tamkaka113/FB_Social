import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  like: {
    type: Array,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  postId: mongoose.Types.ObjectId,
  postUserId: mongoose.Types.ObjectId
});

export default mongoose.model('Comment',CommentSchema)
