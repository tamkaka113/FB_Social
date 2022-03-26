import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
export default function Topbar() {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetail);
  return (
    <div className="topbarContainer">
      <Link to='/'className="topbarLeft">
        <span className="logo">FB Social</span>
      </Link>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${userInfo._id}`}>
        <img
          src={user?.profilePicture || "../../assets/person/noUser.jpg"}
          alt=""
          className="topbarImg"
        />
        </Link>
      </div>
    </div>
  );
}
