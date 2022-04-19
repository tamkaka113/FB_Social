import "./recommendedFriends.css";
import { followUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { FOLLOW_USER_RESET } from "../../constants/userConstants";
import { useHistory } from "react-router-dom";
export default function RecommendedFriends({ user, mobile }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFollowUser = (id) => {
    dispatch(followUser(id));
    dispatch({ type: FOLLOW_USER_RESET });
  };
  return (
    <li className="sidebarFriend">
      <div
        className="sidebarFriendWrapper"
        onClick={() => history.push(`/profile/${user._id}`)}
      >
        <img
          className="sidebarFriendImg"
          src={user.profilePicture || "../../assets/person/noUser.jpg"}
          alt=""
        />
        <span
          className={mobile ? " sidebarFriendName mobile" : "sidebarFriendName"}
        >
          {user.username}
        </span>
      </div>
      <button
        onClick={() => {
          handleFollowUser(user._id);
        }}
        className={mobile ? "sidebarFriendBtn mobile" : "sidebarFriendBtn"}
      >
        Following
      </button>
    </li>
  );
}
