import React from "react";
import "./followingButton.css";
export default function FollowingButton({ followed, handleFollow }) {
  return (
    <div>
      <button className="followingBtn" onClick={handleFollow}>
        {followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
