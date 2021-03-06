import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import "./messenger.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  getMessages,
  createMessages,
} from "../../actions/messageActions";
import { getUserFriends } from "../../actions/userActions";
import { CREATE_MESSAGE_RESET } from "../../constants/messageContants";

export default function Messenger({ history, match }) {
  const messRef = useRef(null);
  const id = match.params.id;
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.getConversation);
  const { messages: newMessages } = useSelector((state) => state.getMessages);
  const { success: createConversationSuccess } = useSelector(
    (state) => state.createConversation
  );
  const { users } = useSelector((state) => state.userFriends);
  const [messages, setMessages] = useState([]);
  const [chatActive, setChatActive] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: createMessageSuccess } = useSelector(
    (state) => state.createMessage
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(getConversations(userInfo?._id));
    }
    dispatch(getMessages(id));

    if (createMessageSuccess) {
      dispatch({ type: CREATE_MESSAGE_RESET });
      dispatch(getMessages(id));
      setNewMessage("");
    }
  }, [
    userInfo,
    id,
    createMessageSuccess,
    currentChat,
    createConversationSuccess,
    dispatch,
  ]);

  useEffect(() => {
    messRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  useEffect(() => {
    dispatch(getUserFriends(userInfo?._id));
  }, []);

  const handleMessage = (c, idx) => {
    setChatActive(idx);
    setCurrentChat(c);
    history.push(`/messenger/${c._id}`);
  };

  const handleSubmit = () => {
    if (newMessage) {
      dispatch(
        createMessages({
          conversationId: id,
          sender: userInfo._id,
          text: newMessage,
        })
      );
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c, idx) => (
              <div key={idx} onClick={() => handleMessage(c, idx)}>
                <Conversation
                  chatActive={chatActive}
                  idx={idx}
                  conversation={c}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {newMessages.length === 0 && (
                <span className="startConversation">
                  You are friends, start a conversation now
                </span>
              )}

              {newMessages.map((m, index) => (
                <div key={index} ref={messRef}>
                  <Message message={m} own={userInfo._id === m.sender._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button onClick={handleSubmit} className="chatSubmitButton">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline conversations={conversations} users={users} />
          </div>
        </div>
      </div>
    </>
  );
}
