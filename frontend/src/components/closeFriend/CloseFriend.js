import "./closeFriend.css";
import { followUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { FOLLOW_USER_RESET } from "../../constants/userConstants";
export default function CloseFriend({ user }) {
  const dispatch = useDispatch();
  const handleFollowUser = (id) => {
    dispatch(followUser(id));
    dispatch({ type: FOLLOW_USER_RESET });
  };
  return (
    <li className="sidebarFriend">
      <div className="sidebarFriendWrapper">
        <img
          className="sidebarFriendImg"
          src={user.profilePicture || "../../assets/person/noUser.jpg"}
          alt=""
        />
        <span className="sidebarFriendName">{user.username}</span>
      </div>
      <button
        onClick={() => {
          handleFollowUser(user._id);
        }}
        className="sidebarFriendBtn"
      >
        Following
      </button>
    </li>
  );
}
