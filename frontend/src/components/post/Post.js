import "./post.css";
import { MoreVert, ThumbUpAltRounded } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import { likePost } from "../../actions/postActions";
import { editComment, deleteComment,likeComment } from "../../actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../actions/commentActions";
import {
  CREATE_COMMENT_RESET,
  DELETE_COMMENT_RESET,
  EDIT_COMMENT_RESET,
  LIKE_COMMENT_RESET,
} from "../../constants/commentContants";
import moment from "moment";
export default function Post({ post, editSuccess,likeSuccess }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [content, setContent] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedComment, setIsLikedComment] = useState(false);
  const [display, setDisplay] = useState(false);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [displayEdit, setDisplayEdit] = useState(false);
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

  const handleEdit = (index) => {
    setEdit(index);

    setDisplayEdit(!displayEdit);
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteComment(id));

      dispatch({ type: DELETE_COMMENT_RESET });
    }
  };

  const handleUpdateComment = (id) => {
    dispatch(editComment(id, value));
  };

  useEffect(() => {
    if (update) {
      inputRef.current.focus();
    }

    if (editSuccess) {
      dispatch({ type: EDIT_COMMENT_RESET });
      setUpdate(false);
    }

    if(likeSuccess) {
      dispatch({ type: LIKE_COMMENT_RESET });
    }
  }, [update, editSuccess,likeSuccess]);
  const handlUpdate = (content) => {
    setUpdate(true);
    setValue(content);
    setDisplayEdit(false);
  };

  const handleLike =(id,likes) => {

  dispatch(likeComment(id))


  const userLiked = likes.find(like => like._id === userInfo._id)

  if(userLiked) {
    setIsLikedComment(true)
  }

   
  }
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
                <div key={comment._id}>
                  {update ? (
                    <div className="commentContainer">
                      <input
                        ref={inputRef}
                        value={value}
                        className="commentInput"
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          handleUpdateComment(comment._id);
                        }}
                        className="commentBtn"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div className="commentMain">
                      <div className="commentWrapper">
                       {comment.likes.length > 0 &&<div className="commentLikeIcon">
                          <ThumbUpAltRounded
                            style={{ color: "#1877f2", fontSize: "20px" }}
                          />
                          <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                            {comment.likes.length}
                          </span>
                        </div>} 
                        <div className="commentProfile">
                          <img
                            style={{ width: "40px", height: "40px" }}
                            className="postProfileImg"
                            src={
                              user.profilePicture ||
                              "../../assets/person/noUser.jpg"
                            }
                            alt=""
                          />
                          <span className="postUsername">
                            {commentUser.username}
                          </span>
                        </div>

                        <div className="likeWrapper">
                          <span className="postComment">{comment.content}</span>
                          <div className="commentLike">
                            <span onClick={()=> {handleLike(comment._id,comment.likes)}} className={isLikedComment ? "likeComment active":"likeComment" }>Like</span>
                            <span className="replyComment">Reply</span>
                            <span className="timeComment">
                              {moment(comment.createdAt).fromNow()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="editWrapper">
                        <div
                          className="editIcon"
                          onClick={() => handleEdit(index)}
                        >
                          <MoreVert style={{ fontSize: "medium" }} />
                        </div>
                        <div
                          className={
                            edit === index && displayEdit
                              ? "adjustComment active"
                              : "adjustComment"
                          }
                        >
                          <span
                            onClick={() => {
                              handlUpdate(comment.content);
                            }}
                            className="adjustEdit"
                          >
                            Edit
                          </span>

                          <span
                            onClick={() => {
                              handleDeleteComment(comment._id);
                            }}
                            className="adjustEdit"
                          >
                            Remove
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
