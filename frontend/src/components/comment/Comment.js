import { useState, useRef, useEffect } from "react";
import moment from "moment";
import { MoreVert, ThumbUpAltRounded } from "@material-ui/icons";
import { useDispatch,useSelector } from "react-redux";
import './comment.css'
import {
    DELETE_COMMENT_RESET,
    EDIT_COMMENT_RESET,
    LIKE_COMMENT_RESET,
  } from "../../constants/commentContants";
import {
  editComment,
  deleteComment,
  likeComment,
} from "../../actions/commentActions";
const Comment = ({ comment, user, commentUser, index }) => {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [displayEdit, setDisplayEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [replyDisplay, setReplyDisplay] = useState(false);
  const {success:deleteSuccess} = useSelector((state) => state.deleteComment);
  const {success:editSuccess} = useSelector((state) => state.editComment);
  const {success:likeSuccess,message} = useSelector((state) => state.likeComment);

  const dispatch = useDispatch();


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
  }, [update, editSuccess, likeSuccess,message]);
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
  const handleLike = (id, likes) => {
    dispatch(likeComment(id));
  };
  const handlUpdate = (content) => {
    setUpdate(true);
    setValue(content);
    setDisplayEdit(false);
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
                  className="postProfileImg"
                  src={user.profilePicture || "../../assets/person/noUser.jpg"}
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
                    className={"likeComment"}
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
                <div className="replyInput">
                  <input className="commentInput" />
                  <button className="replyBtn">Send</button>
                </div>
              </div>
            </div>

            <div className="editWrapper">
              <div className="editIcon" onClick={() => handleEdit(index)}>
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
    </div>
  );
};

export default Comment;
