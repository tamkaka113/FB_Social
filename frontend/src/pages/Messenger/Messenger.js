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
import io from 'socket.io-client'
import { CREATE_MESSAGE_RESET } from "../../constants/messageContants";

export default function Messenger({ history, match }) {
  const messRef = useRef(null);
  const id = match.params.id;
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
const socket = useRef()
  const { userInfo } = useSelector((state) => state.userLogin);
  const { conversation } = useSelector((state) => state.getConversation);
  const { messages: newMessages } = useSelector((state) => state.getMessages);
  const { success: createMessageSuccess } = useSelector(
    (state) => state.createMessage
  );

  useEffect(()=> {
    socket.current = io('ws://localhost:3000')
  },[])


 useEffect(()=> {
    socket?.current.emit('addUsers',userInfo._id)
    socket?.current.on('getUsers', users => {
      setOnlineUsers(users)
    })
  },[]) 
  console.log(onlineUsers)
  useEffect(() => {
    dispatch(getConversations(userInfo?._id));
    dispatch(getMessages(id));

    if (createMessageSuccess) {
      dispatch({ type: CREATE_MESSAGE_RESET });
    }
  }, [userInfo, id, createMessageSuccess]);

  useEffect(() => {
    messRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  const handleMessage = (c) => {
    history.push(`/messenger/${c._id}`);
  };

  const handleSubmit = () => {
    dispatch(
      createMessages({
        conversationId: id,
        sender: userInfo._id,
        text: newMessage,
      })
    );
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
              {newMessages.map((m) => (
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
            <ChatOnline onlineUsers={onlineUsers} />
          </div>
        </div>
      </div>
    </>
  );
}
