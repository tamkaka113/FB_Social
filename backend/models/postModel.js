import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  image: {
    type: Array,
  },
  desc: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);
