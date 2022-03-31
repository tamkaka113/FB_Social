import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useSelector } from "react-redux";
export default function Share() {
  const {user} = useSelector((state) => state.userDetail);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
         <div className="shareShowWrapper">
          <img className="shareProfileImg" src={user?.profilePicture || "../../assets/person/noUser.jpg"} alt="" />

          <input
            placeholder="What's in your mind Safak?"
            className="shareInput"
            />
            </div>
            <div className="shareImageWrapper" >
         <img src="assets/post/1.jpeg" className="shareShowImage" /> 

            </div>

        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <div className="shareOptionWrapper">
                    <input className="shareOptionInput" type='file' poin/> 
                    <span className="shareOptionText">Photo or Video</span>

                    </div>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
