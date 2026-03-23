import { useState } from "react";
import Child from "./Child";

export function Parent3() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} />
    </>
  );
}
