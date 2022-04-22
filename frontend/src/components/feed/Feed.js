import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { getAllPosts } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function Feed({ paramsId }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const getPosts = useSelector((state) => state.getAllPosts);
  const { success: commentSuccess } = useSelector(
    (state) => state.createComment
  );

  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteComment
  );

  const { success: updateProfileSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const { success: editSuccess } = useSelector((state) => state.editComment);
  const { success: likeSuccess, message } = useSelector(
    (state) => state.likeComment
  );
  const { success: likePostSuccess } = useSelector((state) => state.likePost);
  const { success: createPostSuccess } = useSelector(
    (state) => state.createPost
  );
  const { success: deletePostSuccess } = useSelector(
    (state) => state.deletePost
  );

  const { success: followSuccess } = useSelector((state) => state.followUser);
  const { success: replySuccess } = useSelector((state) => state.replyComment);
  const { success: updatePostSuccess } = useSelector(
    (state) => state.updatePost
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const { posts } = getPosts;
  useEffect(() => {
    if (id) {
      dispatch(getAllPosts(id));
    } else {
      dispatch(getAllPosts("all"));
    }
  }, [
    dispatch,
    id,
    commentSuccess,
    deleteSuccess,
    editSuccess,
    message,
    createPostSuccess,
    deletePostSuccess,
    updatePostSuccess,
    updateProfileSuccess,
    followSuccess,
    replySuccess,
    likeSuccess,
    likePostSuccess,
    userInfo?.username,
  ]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!paramsId || paramsId === userInfo?._id) && <Share />}
        {posts?.map((p, idx) => (
          <Post
            key={idx}
            post={p}
            updatePostSuccess={updatePostSuccess}
            idx={idx}
            likePostSuccess={likePostSuccess}
            deletePostSuccess={deletePostSuccess}
          />
        ))}
      </div>
    </div>
  );
}
