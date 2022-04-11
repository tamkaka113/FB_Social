import { useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { PhotoCamera } from "@material-ui/icons";
import { useEffect } from "react";
import { API_URL } from "../../utils/config";
import {
  getUserDetails,
  getUserFriends,
  updateUserProfile,
} from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
export default function Profile({ match }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  const [cover, setCover] = useState("");
  const { user } = useSelector((state) => state.userDetail);
  const { success: updateProfileSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
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
  }, [id, dispatch, image, updateProfileSuccess, cover]);
  return (
    <>
      <Topbar />
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
                  placeholder="What's in your mind Safak?"
                  className="profileUserInput"
                  type="file"
                  onChange={(e) => handleImage(e, "profile")}
                />
              </div>
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
