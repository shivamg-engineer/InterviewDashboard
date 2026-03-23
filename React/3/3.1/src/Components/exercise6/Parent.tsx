import { useState } from "react";
import { Child } from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  console.log("parent re-rendered");

  return (
    <div>
      <h2>Parent Count: {count}</h2>

      <button onClick={() => setCount((c) => c + 1)}>Increment Parent</button>
      {/* ✅ Static prop */}
      <Child title="I am static" />
    </div>
  );
}

export default Parent;
