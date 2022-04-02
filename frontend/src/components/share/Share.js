import "./share.css";
import { useEffect, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions, ContactSupport } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { createPost } from "../../actions/postActions";
import {CREATE_POST_RESET} from '../../constants/postConstants'
export default function Share() {
  const dispatch = useDispatch();
  const [images, setImages] = useState();
  const [desc, setDesc] = useState("");
  const { user } = useSelector((state) => state.userDetail);
  const { success: createPostSuccess } = useSelector(
    (state) => state.createPost
  );

  useEffect(()=> {
  if(createPostSuccess) {
    setDesc('')
    setImages()

    setTimeout(()=> {

      dispatch({type:CREATE_POST_RESET})
    },1000)
  }
  },[createPostSuccess])
  const handleImage = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const requests = files.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return axios.post(`/api/v1/posts/uploads`, formData);
      });

      const responses = await Promise.all(requests);

      const data = responses.map((response) => {
        return response.data;
      });

      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImg = (idx) => {
    const newImage = images?.filter((_, index) => index !== idx);

    setImages(newImage);
  };
  const handleCreatePost = () => {
    dispatch(createPost({ image:images, desc }));
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareShowWrapper">
            <img
              className="shareProfileImg"
              src={user?.profilePicture || "../../assets/person/noUser.jpg"}
              alt=""
            />

            <input
              placeholder="What's in your mind Safak?"
              className="shareInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="shareImageWrapper">
            {images?.map((image, idx) => {
              return (
                <div
                  className="shareImageContainer"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span onClick={() => handleRemoveImg(idx)}>x</span>
                  <img
                    src={image}
                    style={{ width: "100%", height: "100%" }}
                    className="shareShowImage"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <div className="shareOptionWrapper">
                <input
                  className="shareOptionInput"
                  multiple
                  type="file"
                  onChange={(e) => handleImage(e)}
                />
                <span className="shareOptionText">Photo or Video</span>
              </div>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button onClick={()=>{handleCreatePost()}} className="shareButton">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
