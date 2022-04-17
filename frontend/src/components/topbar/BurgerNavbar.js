import React, { useState } from "react";
import "./BurgerNavbar.css";
import { useSelector } from "react-redux";
import Conversation from "../conversations/Conversation";
import { useHistory } from "react-router-dom";
export default function BurgerNavbar(props) {
  const history = useHistory();
  const [chatActive, setChatActive] = useState(0);
  const { user, paramsId, userInfo, openNv, setOpenNav, handleLogout } = props;
  const { users } = useSelector((state) => state.userFriends);
  const { conversations } = useSelector((state) => state.getConversation);

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
          <p className="burgerCoversations"> Conversations</p>
          <div className="onlineFriends">
            {conversations?.map((c, idx) => {
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
                  />
                  ;
                </div>
              );
            })}
          </div>
          <hr />
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
