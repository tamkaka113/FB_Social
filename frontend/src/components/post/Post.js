import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { likePost } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
export default function Post({ post }) {
  const dispatch = useDispatch();
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const {user} =post

  const {userInfo} = useSelector(state => state.userLogin)
  useEffect(()=> {
    setIsLiked(post.likes.includes(userInfo._id))

  },[userInfo._id,post.likes])
  const likeHandler =(id)=>{
   setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked) 
    dispatch(likePost(id))

  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
            style={{width:'40px', height:'40px'}}
              className="postProfileImg"
              src={user.profilePicture  || '../../assets/person/noUser.jpg'}
              alt=""
            />
            <span className="postUsername">
            {user.username}
            </span>
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
            <img className="likeIcon" src="assets/like.png" onClick={()=> {likeHandler(post._id)}} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={()=> {likeHandler(post._id)}}  alt="" />
            <span className="postLikeCounter">{like } people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
