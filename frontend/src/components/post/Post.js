import "./post.css";
import { MoreVert, EditOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { likePost } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../actions/commentActions";
import { CREATE_COMMENT_RESET } from "../../constants/commentContants";
export default function Post({ post }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [display, setDisplay] = useState(false);

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
  };

  const handleEdit = (index) => {
    setEdit(index);

    setDisplayEdit(!displayEdit);
  };

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
                  <div className="commentMain">
                    <div className="commentWrapper">
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
                          <span className="likeComment">Like</span>
                          <span className="replyComment">Reply</span>
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
                        <span className="adjustEdit">Edit</span>
                        <span className="adjustEdit">Remove</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
