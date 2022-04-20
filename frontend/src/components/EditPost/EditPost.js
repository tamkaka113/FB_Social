import React, { useState } from "react";
import { updatePost } from "../../actions/postActions";
import "./edit.css";
import { useDispatch } from "react-redux";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { handleImages } from "../../utils/helpler";
export default function EditPost({ post }) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(post.desc);
  const [images, setImages] = useState(post.image);
  const handleUpdatePost = (id) => {
    dispatch(updatePost(id, { desc, image: images }));
  };

  const handleRemove = (idx) => {
    const newImages = images.filter((_, index) => index !== idx);

    setImages(newImages);
  };
  return (
    <div className="editPost">
      <div className="editPostWrapper">
        <div className="editPostTop">
          <div className="editPostShowWrapper">
            <img
              className="editPostProfileImg"
              src={
                post.user?.profilePicture || "../../assets/person/noUser.jpg"
              }
              alt=""
            />

            <input
              value={desc}
              placeholder="What's in your mind Safak?"
              className="editPostInput"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="editPostImageWrapper">
            {images.map((img, idx) => {
              return (
                <div
                  key={idx}
                  className="editPostImageContainer"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span
                    onClick={() => {
                      handleRemove(idx);
                    }}
                  >
                    x
                  </span>
                  <img
                    src={img}
                    style={{ width: "100%", height: "100%" }}
                    className="editPostShowImage"
                    alt="edit-image"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <hr className="editPostHr" />
        <div className="editPostBottom">
          <div className="editPostOptions">
            <div className="editPostOption">
              <PermMedia htmlColor="tomato" className="editPostIcon" />
              <div className="editPostOptionWrapper">
                <input
                  className="editPostOptionInput"
                  multiple
                  type="file"
                  onChange={(e) => {
                    handleImages(e, setImages);
                  }}
                />
                <span className="editPostOptionText">Photo or Video</span>
              </div>
            </div>
            <div className="editPostOption">
              <Label htmlColor="blue" className="editPostIcon" />
              <span className="editPostOptionText">Tag</span>
            </div>
            <div className="editPostOption">
              <Room htmlColor="green" className="editPostIcon" />
              <span className="editPostOptionText">Location</span>
            </div>
            <div className="editPostOption">
              <EmojiEmotions htmlColor="goldenrod" className="editPostIcon" />
              <span className="editPostOptionText">Feelings</span>
            </div>
          </div>
          <button
            onClick={() => {
              handleUpdatePost(post._id);
            }}
            className="editPostButton"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
