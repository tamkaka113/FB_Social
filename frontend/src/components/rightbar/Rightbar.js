import "./rightbar.css";
import { useEffect, useState } from "react";
import Online from "../online/Online";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/userActions";
export default function Rightbar({ profile, paramsId }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userFriends);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [user, setUser] = useState(userInfo);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(userInfo?.following.includes(paramsId));
  }, [paramsId, userInfo?.following]);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user, paramsId]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="../../assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {users && users?.map((u, idx) => <Online key={idx} user={u} />)}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const history = useHistory();

    const handleFollow = () => {
      if (followed) {
        dispatch(unFollowUser(paramsId));
        setUser({
          ...user,
          following: user.following.filter((f) => f !== paramsId),
        });
      } else {
        dispatch(followUser(paramsId));
        setUser({
          ...user,
          following: [...user.following, paramsId],
        });
      }
      setFollowed(!followed);
    };

    return (
      <>
        {paramsId !== userInfo?._id && (
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
                  key={user._id}
                  onClick={() => history.push(`/profile/${user?._id}`)}
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
