import React from "react";

import "./BurgerNavbar.css";

export default function BurgerNavbar({ user, paramsId, userInfo }) {
  return (
    <div className="burgerNav">
      <div className="burgerContent active">
        <div className="burgerContainer">
          <div className="profileBugerWrapper">
            <span>{userInfo?.username}</span>
            <img
              src={
                !paramsId || (paramsId && paramsId === userInfo._id)
                  ? user?.profilePicture
                  : userInfo?.profilePicture
              }
              alt=""
              className="burgerImg"
            />
          </div>

          <hr />
          <p className="burgerCoversations"> Conversations</p>
          <div className="onlineFriends">
            <div className="onlineFriend">
              <div className="profileFriendWrapper">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className="burgerFriendImg"
                />
                <span>{userInfo?.username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="burgerOverlay active"></div>
    </div>
  );
}
