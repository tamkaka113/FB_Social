import "./online.css";
import { useHistory } from "react-router-dom";
export default function Online({ user, mobile }) {
  const history = useHistory();
  return (
    <li
      className="rightbarFriend"
      onClick={() => history.push(`/profile/${user._id}`)}
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
