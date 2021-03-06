import { useEffect, useState } from "react";
import "./conversation.css";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Conversation({
  chatActive,
  idx,
  conversation,
  mobile,
}) {
  const [user, setUser] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const otherUsersId = conversation.members.find(
      (member) => member !== userInfo._id
    );
    const getUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `/api/v1/users/conversations/${otherUsersId}`,
          config
        );

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userInfo, conversation.members]);
  return (
    <div
      className={chatActive === idx ? "conversation active" : "conversation"}
    >
      <img className="conversationImg" src={user?.profilePicture} alt="" />
      <span className={mobile ? "conversationName mobile" : "conversationName"}>
        {user?.username}
      </span>
    </div>
  );
}
