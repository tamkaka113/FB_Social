import React, { useState } from "react";
import "./BurgerNavbar.css";
import { useSelector } from "react-redux";
import Conversation from "../conversations/Conversation";
import { useHistory, useLocation } from "react-router-dom";
import RecommendedFriends from "../recommendedFriends/RecommendedFriends";
import FriendOnline from "../friendsOnline/FriendOnline";
export default function BurgerNavbar(props) {
  const { pathname } = useLocation();
  const location = pathname.includes("messenger");
  const history = useHistory();
  const [chatActive, setChatActive] = useState(0);
  const { user, paramsId, userInfo, openNv, setOpenNav, handleLogout } = props;

  const { conversations } = useSelector((state) => state.getConversation);
  const { users } = useSelector((state) => state.recommendedFriends);

  const { users: userFriends } = useSelector((state) => state.userFriends);
  const newUsers = users?.filter((user) => user._id !== userInfo?._id);

  const handleConversation = (c, idx) => {
    setChatActive(idx);
    history.push(`/messenger/${c._id}`);

    setOpenNav(false);
  };

  return (
    <div className="burgerNav">
      <div className={openNv ? "burgerContent active" : "burgerContent"}>
        <div className="burgerContainer">
          <div className="profileBugerWrapper">
            <div
              className="profileBuger"
              onClick={() => history.push(`/profile/${userInfo._id}`)}
            >
              <span>{userInfo?.username}</span>
              <img
                src={
                  !paramsId || (paramsId && paramsId === userInfo?._id)
                    ? user?.profilePicture
                    : userInfo?.profilePicture
                }
                alt=""
                className="burgerImg"
              />
            </div>
          </div>
          <hr />
          <p className="burgerCoversations">Online Friends</p>
          <div className="onlineFriends">
            <FriendOnline users={userFriends} />
          </div>
          <p className="burgerCoversations">
            {location ? "Conversation" : "Friends You May Know"}
          </p>

          <div className="onlineFriends">
            {location
              ? conversations?.map((c, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        handleConversation(c, idx);
                      }}
                    >
                      <Conversation
                        chatActive={chatActive}
                        idx={idx}
                        conversation={c}
                        mobile
                      />
                    </div>
                  );
                })
              : newUsers?.map((user, idx) => {
                  return (
                    <div key={idx}>
                      <RecommendedFriends mobile user={user} />
                    </div>
                  );
                })}
          </div>
          <button onClick={handleLogout} className="bugerLogoutBtn">
            Log out
          </button>
        </div>
      </div>
      <div
        onClick={() => setOpenNav(false)}
        className={openNv ? "burgerOverlay active" : "burgerOverlay"}
      ></div>
    </div>
  );
}
