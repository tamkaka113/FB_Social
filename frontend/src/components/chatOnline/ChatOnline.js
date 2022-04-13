import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import { createConversation } from "../../actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CREATE_CONVERSATION_RESET } from "../../constants/messageContants";
export default function ChatOnline({ users, conversations }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: createConversationSuccess, conversation } = useSelector(
    (state) => state.createConversation
  );

  let newUsers = [];
  for (const c of conversations) {
    const userId = c.members.find((m) => m !== userInfo._id);

    newUsers.push(userId);
  }
  const showedUsers = [...new Set(newUsers)];

  useEffect(() => {
    if (createConversationSuccess) {
      history.push(`/messenger/${conversation._id}`);
      dispatch({ type: CREATE_CONVERSATION_RESET });
    }
  }, [createConversationSuccess]);

  const handleStartConversation = (user) => {
    if (!showedUsers.includes(user._id)) {
      dispatch(
        createConversation({
          senderId: userInfo._id,
          recieverId: user._id,
        })
      );
    }
  };

  return (
    <div className="chatOnline">
      {users?.map((user) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handleStartConversation(user);
          }}
        >
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
