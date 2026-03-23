import React from "react";
import { useRecoilValue } from "recoil";
import { usernameState } from "./recoil/usernameAtom";

function UserProfile() {
  const username = useRecoilValue(usernameState);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>
        Current User: <span style={{ color: "blue" }}>{username}</span>
      </h3>
    </div>
  );
}

export default UserProfile;
