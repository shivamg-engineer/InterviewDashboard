import { useState } from "react";

export const Form = () => {
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Your name is :{name}</p>
    </div>
  );
};
