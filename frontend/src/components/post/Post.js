import "./post.css";
import { MoreVert, ThumbUpAltRounded } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import { likePost } from "../../actions/postActions";
import {
  editComment,
  deleteComment,
  likeComment,
} from "../../actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../actions/commentActions";
import {
  CREATE_COMMENT_RESET,
  DELETE_COMMENT_RESET,
  EDIT_COMMENT_RESET,
  LIKE_COMMENT_RESET,
} from "../../constants/commentContants";
import Comment from "../comment/Comment";

export default function Post({ post, editSuccess, likeSuccess }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [content, setContent] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const [display, setDisplay] = useState(false);
  const [update, setUpdate] = useState(false);
  const { user, comments } = post;

  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo._id));
  }, [userInfo._id, post.likes]);
  const likeHandler = (id) => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    dispatch(likePost(id));
  };

  const handleComment = (postId) => {
    dispatch(
      createComment({
        content,
        postId,
        user: userInfo._id,
      })
    );

    dispatch({ type: CREATE_COMMENT_RESET });

    setContent("");
  };

  useEffect(() => {
 
    if (editSuccess) {
      dispatch({ type: EDIT_COMMENT_RESET });
      setUpdate(false);
    }

    if (likeSuccess) {
      dispatch({ type: LIKE_COMMENT_RESET });
    }
  }, [ editSuccess, likeSuccess]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              style={{ width: "40px", height: "40px" }}
              className="postProfileImg"
              src={user.profilePicture || "../../assets/person/noUser.jpg"}
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={() => {
                likeHandler(post._id);
              }}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={() => {
                likeHandler(post._id);
              }}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span onClick={() => setDisplay(true)} className="postCommentText">
              {post.comments.length} comments
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
                  comment={comment}
                  commentUser={commentUser}
                  user={user}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
