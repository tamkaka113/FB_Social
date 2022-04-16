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
    if (!userInfo?.username) {
      history.push("/login");
    }
  }, [userInfo?.username]);

  useEffect(() => {
    dispatch(getUserFriends(userInfo?._id));
  }, [followSuccess, userInfo?._id, dispatch]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
