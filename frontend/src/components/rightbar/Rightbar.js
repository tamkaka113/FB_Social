import "./rightbar.css";
import { useEffect, useState } from "react";
import Online from "../online/Online";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/userActions";
import {
  FOLLOW_USER_RESET,
  UNFOLLOW_USER_RESET,
} from "../../constants/userConstants";
export default function Rightbar({ profile, paramsId }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userFriends);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: unfollowSuccess, user: unfollowUsers } = useSelector(
    (state) => state.unfollowUser
  );
  const { success: followSuccess, user } = useSelector(
    (state) => state.followUser
  );
  console.log(user, unfollowUsers);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (userInfo?.following?.includes(paramsId)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
    if (unfollowSuccess) {
    }

    if (followSuccess) {
    }
  }, [paramsId, userInfo, unfollowSuccess, followSuccess]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="../../assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users?.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const history = useHistory();

    const handleFollow = () => {
      if (followed) {
        dispatch(unFollowUser(paramsId));
      } else {
        dispatch(followUser(paramsId));
      }
    };

    return (
      <>
        {paramsId !== userInfo._id && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {users &&
            users?.map((user) => {
              return (
                <div
                  onClick={() => history.push(`/profile/${user._id}`)}
                  className="rightbarFollowing"
                >
                  <img
                    src={
                      user?.profilePicture ||
                      "../../../assets/person/noUser.jpg"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{user.username}</span>
                </div>
              );
            })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
