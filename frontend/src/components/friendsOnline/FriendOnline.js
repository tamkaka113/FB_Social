import React from "react";
import Online from "../online/Online";
export default function FriendOnline({ users }) {
  console.log(users);
  return (
    <ul className="rightbarFriendList">
      {users && users?.map((u, idx) => <Online key={idx} user={u} />)}
    </ul>
  );
}
