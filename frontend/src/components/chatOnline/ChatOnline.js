import { useEffect } from "react";
import "./chatOnline.css";
import { createConversation } from "../../actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CREATE_CONVERSATION_RESET } from "../../constants/messageContants";
import { handleUserIdByCon } from "../../utils/helpler";
export default function ChatOnline({ users, conversations, mobile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: createConversationSuccess, conversation } = useSelector(
    (state) => state.createConversation
  );

  const showedUsers = handleUserIdByCon(conversations, userInfo._id);

  useEffect(() => {
    if (createConversationSuccess) {
      history.push(`/messenger/${conversation._id}`);
      dispatch({ type: CREATE_CONVERSATION_RESET });
    }
  }, [createConversationSuccess, dispatch, history, conversation?._id]);

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
    <div className={"chatOnlineFriends"}>
      {users?.map((user, idx) => (
        <div
          key={idx}
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
