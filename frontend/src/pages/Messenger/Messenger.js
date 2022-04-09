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
import { io } from "socket.io-client";
import { CREATE_MESSAGE_RESET } from "../../constants/messageContants";

export default function Messenger({ history, match }) {
  const messRef = useRef(null);
  const id = match.params.id;
  const dispatch = useDispatch();
  const { conversation } = useSelector((state) => state.getConversation);
  const { messages: newMessages } = useSelector((state) => state.getMessages);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  console.log(arrivalMessage);
  const { success: createMessageSuccess } = useSelector(
    (state) => state.createMessage
  );

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("ws://localhost:5000", { withCredentials: true });
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log({ data });
      // setArrivalMessage({
      //   sender: data.senderId,
      //   text: data.text,
      //   createdAt: Date.now(),
      // });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current.emit("addUsers", userInfo._id);
    socket?.current.on("getUsers", (users) => {
      setCurrentChat(users);
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch(getConversations(userInfo?._id));
    dispatch(getMessages(id, setMessages));

    if (createMessageSuccess) {
      dispatch({ type: CREATE_MESSAGE_RESET });
      dispatch(getMessages(id, setMessages));
    }
  }, [userInfo, id, createMessageSuccess, currentChat]);

  useEffect(() => {
    messRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  const handleMessage = (c) => {
    setCurrentChat(c);
    history.push(`/messenger/${c._id}`);
  };

  const handleSubmit = () => {
    console.log(socket.current);
    // dispatch(
    //   createMessages({
    //     conversationId: id,
    //     sender: userInfo._id,
    //     text: newMessage,
    //   })
    // );

    // const receiverId = currentChat?.members.find(
    //   (member) => member !== userInfo._id
    // );
    socket.current.emit("sendMessage", {
      senderId: userInfo._id,
      receiverId: 123,
      text: newMessage,
    });
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation.map((c) => (
              <div key={c._id} onClick={() => handleMessage(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={messRef}>
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
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
