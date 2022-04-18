import { useEffect } from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  WorkOutline,
  School,
} from "@material-ui/icons";
import RecommendedFriends from "../recommendedFriends/RecommendedFriends";
import { getRecommendedFriends } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerDotted } from "spinners-react";
export default function Sidebar() {
  const { loading, users } = useSelector((state) => state.recommendedFriends);
  const { success: followSuccess } = useSelector((state) => state.followUser);

  const { userInfo } = useSelector((state) => state.userLogin);
  const newUsers = users?.filter((user) => user._id !== userInfo?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecommendedFriends());
  }, [followSuccess, dispatch]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h3 className="sidebarText">Recommended Friends</h3>
        {loading && (
          <SpinnerDotted className="spinnerPost" style={{ color: "#1877f2" }} />
        )}
        <ul className="sidebarFriendList">
          {newUsers?.map((u) => (
            <RecommendedFriends key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
