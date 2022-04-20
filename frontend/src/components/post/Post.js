import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { likePost, deletePost } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../actions/commentActions";
import { CREATE_COMMENT_RESET } from "../../constants/commentContants";
import {
  LIKE_POST_RESET,
  UPDATE_POST_RESET,
  DELETE_POST_RESET,
} from "../../constants/postConstants";
import moment from "moment";
import Comment from "../comment/Comment";
import EditPost from "../EditPost/EditPost";
export default function Post(props) {
  const { post, idx, updatePostSuccess, likePostSuccess, deletePostSuccess } =
    props;
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [edit, setEdit] = useState(null);
  const [editPost, setEditPost] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [display, setDisplay] = useState(false);
  const { user, comments } = post;
  const { userInfo } = useSelector((state) => state.userLogin);

  console.log(like, post.likes.length);
  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo?._id));
    setLike(post.likes.length);
  }, [userInfo?._id, post.likes]);

  const likeHandler = (id) => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    dispatch(likePost(id));
  };

  useEffect(() => {
    if (updatePostSuccess) {
      setEditPost(false);
      setEditDisplay(false);
      dispatch({ type: UPDATE_POST_RESET });
    }

    if (likePostSuccess) {
      dispatch({ type: LIKE_POST_RESET });
    }

    if (deletePostSuccess) {
      dispatch({ type: DELETE_POST_RESET });
    }
  }, [updatePostSuccess, dispatch, likePostSuccess, deletePostSuccess]);
  const handleComment = (postId) => {
    if (content) {
      dispatch(
        createComment({
          content,
          postId,
          user: userInfo._id,
        })
      );
    }

    dispatch({ type: CREATE_COMMENT_RESET });

    setContent("");
  };

  const handleShowEdit = (idx) => {
    setEdit(idx);
    setEditDisplay(!editDisplay);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePost(id));
      setEditDisplay(!editDisplay);
    }
  };

  let replyLength = 0;

  for (const element of post.comments) {
    replyLength += element.reply.length;
  }

  return (
    <div className="post">
      {editPost ? (
        <EditPost post={post} />
      ) : (
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                style={{ width: "40px", height: "40px" }}
                className="postProfileImg"
                src={user?.profilePicture || "../../assets/person/noUser.jpg"}
                alt=""
              />
              <div className="postTopWWrapper">
                <span className="postUsername">{user?.username}</span>
                <span className="postDate">
                  {" "}
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            </div>
            <div className="postTopRight">
              <div
                onClick={() => {
                  handleShowEdit(idx);
                }}
                className="postEditMore"
              >
                <MoreVert />
              </div>
              <div
                className={
                  idx === edit &&
                  editDisplay &&
                  post?.user._id === userInfo?._id
                    ? "adjustPost active"
                    : "adjustPost"
                }
              >
                <span
                  onClick={() => setEditPost(true)}
                  className="adjustEditPost"
                >
                  Edit
                </span>

                <span
                  onClick={() => handleRemove(post._id)}
                  className="adjustEditPost"
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={post.image[0]} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="../assets/like.png"
                onClick={() => {
                  likeHandler(post._id);
                }}
                alt=""
              />
              <img
                className="likeIcon"
                src="../assets/heart.png"
                onClick={() => {
                  likeHandler(post._id);
                }}
                alt=""
              />
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span
                onClick={() => setDisplay(true)}
                className="postCommentText"
              >
                {post.comments.length + replyLength} comments
              </span>
            </div>
          </div>
          {display && (
            <div>
              <div className="commentContainer">
                <input
                  placeholder="Write your comment"
                  className="commentInput"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  className="commentBtn"
                  onClick={() => handleComment(post._id)}
                >
                  Send
                </button>
              </div>

              {comments.map((comment, index) => {
                const { user: commentUser } = comment;
                return (
                  <Comment
                    key={index}
                    comment={comment}
                    commentUser={commentUser}
                    user={user}
                    index={index}
                    post={post}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
