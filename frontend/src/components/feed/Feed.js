import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { getAllPosts } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';
export default function Feed() {
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
  const { success: createPostSuccess } = useSelector(
    (state) => state.createPost
  );


  const { success: deletePostSuccess } = useSelector(
    (state) => state.deletePost
  );

  const { success: updatePostSuccess } = useSelector((state) => state.updatePost);


  const { posts,loading:postLoading } = getPosts;
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
  ]);
  return (
    <div className="feed">
      
     <div className="feedWrapper">
     {postLoading? <SpinnerDotted className="spinnerPost" style={{color:'#1877f2'}}/>:
     <div>
     <Share />
     {posts?.map((p,idx) => (
       <Post
         key={p.id}
         post={p}
         updatePostSuccess={updatePostSuccess}
         idx={idx}
       />
     ))}
     </div> }
   </div>
       
      
    </div>
  );
}
