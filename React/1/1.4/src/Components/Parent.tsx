import { useState } from "react";
import Child from "./Child";

function Parent() {
  console.log("👨 Parent rendered");

  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>

      <Child />
    </div>
  );
}

export default Parent;
