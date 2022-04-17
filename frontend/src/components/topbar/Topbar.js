import { useEffect, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications, Menu } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout, getUserDetails } from "../../actions/userActions";
import { getConversations } from "../../actions/messageActions";
import BurgerNavbar from "./BurgerNavbar";
export default function Topbar({ paramsId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [openNv, setOpenNav] = useState(false);
  const { user } = useSelector((state) => state.userDetail);
  const { conversations } = useSelector((state) => state.getConversation);
  console.log(openNv);
  useEffect(() => {
    if (userInfo?.username) {
      dispatch(getUserDetails(userInfo?._id));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    dispatch(getConversations(userInfo?._id));
  }, []);
  const handleLogout = () => {
    if (userInfo?.username) {
      dispatch(logout());
      history.push("/login");
    }
  };

  return (
    <>
      <div className="topbarContainer">
        <Link to="/" className="topbarLeft">
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
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person style={{ fontSize: "32px" }} />
              <span className="topbarIconBadge">1</span>
            </div>
            <div
              className="topbarIconItem"
              onClick={() =>
                history.push(
                  `/messenger/${conversations && conversations[0]?._id}`
                )
              }
            >
              <Chat style={{ fontSize: "32px" }} />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications style={{ fontSize: "32px" }} />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <div
            className="topbarMenuIcon"
            onClick={() => {
              setOpenNav(true);
            }}
          >
            <Menu style={{ fontSize: "32px" }} />
          </div>
          <div className="topbarProfile">
            <Link className="topbarLink" to={`/profile/${userInfo?._id}`}>
              <div className="profileWrapper">
                <span>{userInfo?.username}</span>
                <img
                  src={
                    !paramsId || (paramsId && paramsId === userInfo?._id)
                      ? user?.profilePicture
                      : userInfo?.profilePicture
                  }
                  alt=""
                  className="topbarImg"
                />
              </div>
            </Link>
            <button onClick={handleLogout} className="logoutBtn">
              Log out
            </button>
          </div>
        </div>
        <div className="burgerNavbar">
          <BurgerNavbar
            openNv={openNv}
            setOpenNav={setOpenNav}
            user={user}
            userInfo={userInfo}
            paramsId={paramsId}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </>
  );
}
