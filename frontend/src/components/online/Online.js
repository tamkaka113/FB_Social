import "./online.css";
import { useHistory } from "react-router-dom";
export default function Online({ user, mobile, setOpenNav }) {
  const history = useHistory();
  const handleOnlineFriend = () => {
    history.push(`/profile/${user._id}`);
    setOpenNav(false);
  };
  return (
    <li
      className="rightbarFriend"
      onClick={() => {
        handleOnlineFriend();
      }}
    >
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className={mobile ? "rightbarUsername mobile" : "rightbarUsername"}>
        {user.username}
      </span>
    </li>
  );
}
