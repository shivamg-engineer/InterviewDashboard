import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { usernameState } from "./recoil/usernameAtom";

function UsernameForm() {
  const [tempName, setTempName] = useState("");
  const [, setUsername] = useRecoilState(usernameState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(tempName); // Updates the global state
    setTempName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        placeholder="Enter new username"
      />
      <button type="submit">Update Global Name</button>
    </form>
  );
}

export default UsernameForm;
