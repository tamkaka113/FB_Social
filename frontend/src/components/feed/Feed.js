import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { getAllPosts } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function Feed() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const getPosts = useSelector((state) => state.getAllPosts);
  const { posts } = getPosts;

  useEffect(() => {
    if (id) {
      dispatch(getAllPosts(id));
    } else {
      dispatch(getAllPosts("all"));
    }
  }, [dispatch,id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts?.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
