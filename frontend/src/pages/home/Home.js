import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../../actions/userActions";
export default function Home({ history }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: followSuccess } = useSelector((state) => state.followUser);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getUserFriends(userInfo?._id));
  }, [followSuccess, userInfo?._id, dispatch]);

  return (
    <div className="homeWrapper">
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
