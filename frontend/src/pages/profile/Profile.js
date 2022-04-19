import { useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { PhotoCamera } from "@material-ui/icons";
import { useEffect } from "react";
import {
  getUserDetails,
  getUserFriends,
  updateUserProfile,
} from "../../actions/userActions";
import {
  createConversation,
  getConversationById,
} from "../../actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_CONVERSATION_RESET,
  GET_CON_BYID_RESET,
} from "../../constants/messageContants";
export default function Profile({ match, history }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const { conversations } = useSelector((state) => state.getConversation);
  const { success: createConversationSuccess, conversation } = useSelector(
    (state) => state.createConversation
  );

  const { user } = useSelector((state) => state.userDetail);
  const { success: updateProfileSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { success: getConversationSuccess, conversation: conversationById } =
    useSelector((state) => state.getConversationById);

  console.log(getConversationSuccess);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: followSuccess } = useSelector((state) => state.followUser);

  const handleImage = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await axios.post(`/api/v1/posts/uploads`, formData);

      if (type === "cover") {
        setCover(data);
      } else {
        setImage(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
      dispatch(getUserFriends(id));
    }
    if (image) {
      dispatch(updateUserProfile(id, { profilePicture: image }));
      setImage("");
    }

    if (cover) {
      dispatch(updateUserProfile(id, { coverPicture: cover }));
      setCover("");
    }
  }, [
    id,
    dispatch,
    image,
    updateProfileSuccess,
    cover,
    followSuccess,
    user?._id,
  ]);

  let newUsers = [];
  for (const c of conversations) {
    const userId = c.members.find((m) => m !== userInfo._id);

    newUsers.push(userId);
  }
  const showedUsers = [...new Set(newUsers)];

  useEffect(() => {
    if (createConversationSuccess) {
      history.push(`/messenger/${conversation?._id}`);
      dispatch({ type: CREATE_CONVERSATION_RESET });
    }

    if (getConversationSuccess) {
      history.push(`/messenger/${conversationById?._id}`);
      dispatch({ type: GET_CON_BYID_RESET });
    }
  }, [
    createConversationSuccess,
    dispatch,
    history,
    conversation?._id,
    getConversationSuccess,
  ]);

  const handleStartConversation = () => {
    if (!showedUsers.includes(id)) {
      dispatch(
        createConversation({
          senderId: userInfo._id,
          recieverId: id,
        })
      );
    } else {
      dispatch(getConversationById(userInfo._id, id));
    }
  };

  return (
    <>
      <Topbar paramsId={id} />
      <div className="profile">
        <Sidebar />

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user?.coverPicture}
                alt=""
              />
              <div className="profileCoverWrapper">
                <PhotoCamera className="profileCoverIcon" />
                <input
                  className="profileCoverInput"
                  type="file"
                  onChange={(e) => handleImage(e, "cover")}
                />
              </div>
              <img
                className="profileUserImg"
                src={user?.profilePicture || "../../assets/person/noUser.jpg"}
                alt=""
              />
              <div className="profileUserWrapper">
                <PhotoCamera className="profileUserIcon" />
                <input
                  placeholder="What's in your mind?"
                  className="profileUserInput"
                  type="file"
                  onChange={(e) => handleImage(e, "profile")}
                />
              </div>
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
              {id !== userInfo._id && (
                <button
                  onClick={() => {
                    handleStartConversation();
                  }}
                  className="followingBtn"
                >
                  Message
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed paramsId={id} />
            <Rightbar profile paramsId={id} friendUser={user} />
          </div>
        </div>
      </div>
    </>
  );
}
