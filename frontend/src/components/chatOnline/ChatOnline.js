import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ users }) {
  return (
    <div className="chatOnline">
      {users.map((user) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={user.profilePicture} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{user?.username}</span>
        </div>
      ))}
    </div>
  );
}
