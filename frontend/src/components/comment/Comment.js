import { useState, useRef, useEffect } from "react";
import moment from "moment";
import { MoreVert, ThumbUpAltRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "./comment.css";
import {
  DELETE_COMMENT_RESET,
  EDIT_COMMENT_RESET,
  LIKE_COMMENT_RESET,
  REPLY_COMMENT_RESET,
} from "../../constants/commentContants";
import {
  editComment,
  deleteComment,
  likeComment,
  replyComment,
} from "../../actions/commentActions";
const Comment = ({ comment, commentUser, index, post }) => {
  const inputRef = useRef();
  const replyRef = useRef();
  const [value, setValue] = useState("");
  const [reply, setReply] = useState("");
  const [like, setLike] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayReply, setDisplayReply] = useState(false);
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [replyDisplay, setReplyDisplay] = useState(false);
  const { success: editSuccess } = useSelector((state) => state.editComment);
  const { success: likeSuccess, message } = useSelector(
    (state) => state.likeComment
  );
  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteComment
  );
  const { success: replySuccess } = useSelector((state) => state.replyComment);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  let likesId = [];
  for (const like of comment.likes) {
    likesId.push(like._id);
  }
  useEffect(() => {
    setIsLiked(likesId.includes(userInfo?._id));
  }, [userInfo?._id, comment.likes.length]);

  useEffect(() => {
    if (update) {
      inputRef.current.focus();

      if (editSuccess) {
        dispatch({ type: EDIT_COMMENT_RESET });
        setUpdate(false);
      }

      if (message) {
        dispatch({ type: LIKE_COMMENT_RESET });
      }
    }
    if (replyDisplay) {
      replyRef.current.focus();
    }
    if (replySuccess) {
      setReplyDisplay(false);
      dispatch({ type: REPLY_COMMENT_RESET });
    }

    if (deleteSuccess) {
      setDisplayReply(false);
      dispatch({ type: DELETE_COMMENT_RESET });
    }

    if (likeSuccess) {
      dispatch({ type: LIKE_COMMENT_RESET });
    }
  }, [
    update,
    editSuccess,
    likeSuccess,
    message,
    replyDisplay,
    replySuccess,
    deleteSuccess,
  ]);
  const handleEdit = (index, type) => {
    if (type === "replyPost") {
      setDisplayEdit(!displayEdit);
      setEdit(index);
    } else {
      setDisplayReply(!displayReply);
      setEdit(index);
    }
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteComment(id));
    }
  };

  const handleUpdateComment = (id) => {
    dispatch(editComment(id, value));
  };

  const handlUpdate = (content) => {
    setUpdate(true);
    setValue(content);
    setDisplayEdit(false);
  };
  const handleLike = (id, likes) => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    dispatch(likeComment(id));
  };

  const handleReply = (postId, commentId) => {
    dispatch(
      replyComment(commentId, { postId, content: reply, user: userInfo._id })
    );
  };

  return (
    <div>
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
              {comment.likes.length > 0 && (
                <div className="commentLikeIcon">
                  <ThumbUpAltRounded
                    style={{ color: "#1877f2", fontSize: "20px" }}
                  />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {comment.likes.length}
                  </span>
                </div>
              )}
              <div className="commentProfile">
                <img
                  style={{ width: "40px", height: "40px" }}
                  className="commentProfileImg"
                  src={
                    commentUser.profilePicture ||
                    "../../assets/person/noUser.jpg"
                  }
                  alt=""
                />
                <span className="postUsername">{commentUser.username}</span>
              </div>

              <div className="likeWrapper">
                <span className="postComment">{comment.content}</span>
                <div className="commentLike">
                  <span
                    onClick={() => {
                      handleLike(comment._id, comment.likes);
                    }}
                    className={isLiked ? "likeComment active" : "likeComment"}
                  >
                    Like
                  </span>
                  <span
                    className="replyComment"
                    onClick={() => setReplyDisplay(true)}
                  >
                    Reply
                  </span>

                  <span className="timeComment">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                {replyDisplay && (
                  <div className="replyInput">
                    <input
                      ref={replyRef}
                      onChange={(e) => {
                        setReply(e.target.value);
                      }}
                      className="commentInput"
                    />
                    <button
                      onClick={() => handleReply(post._id, comment._id)}
                      className="replyBtn"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="editWrapper">
              <div
                className="editIcon"
                onClick={() => handleEdit(index, "replyPost")}
              >
                <MoreVert style={{ fontSize: "medium" }} />
              </div>
              <div
                className={
                  edit === index &&
                  displayEdit &&
                  comment.user._id === userInfo._id
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
        {comment.reply?.map((reply, index) => {
          return (
            <div className="replyWrapper">
              <div className="replyEditWrapper">
                <div
                  className="editIcon"
                  onClick={() => handleEdit(index, "replyComment")}
                >
                  <MoreVert style={{ fontSize: "medium" }} />
                </div>
                <div
                  className={
                    edit === index &&
                    displayReply &&
                    reply.user._id === userInfo._id
                      ? "adjustReply active"
                      : "adjustReply"
                  }
                >
                  <span className="adjustEdit">Edit</span>

                  <span
                    className="adjustEdit"
                    onClick={() => {
                      handleDeleteComment(reply._id);
                    }}
                  >
                    Remove
                  </span>
                </div>
              </div>
              <div className="commentProfile">
                <img
                  style={{ width: "40px", height: "40px" }}
                  className="commentProfileImg"
                  src={
                    reply.user.profilePicture ||
                    "../../assets/person/noUser.jpg"
                  }
                  alt=""
                />
                <span className="postUsername">{reply.user.username}</span>
              </div>
              <div className="likeWrapper">
                <span className="postComment">{reply.content}</span>
                <div className="commentLike">
                  <span
                    onClick={() => {
                      handleLike();
                    }}
                    className={"likeComment"}
                  >
                    Like
                  </span>
                  <span className="replyComment">Reply</span>

                  <span className="timeComment">
                    {moment(reply.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
