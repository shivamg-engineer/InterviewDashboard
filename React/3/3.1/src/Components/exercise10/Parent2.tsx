import { useCallback, useState } from "react";
import Child from "./Child";

function Parent2() {
  const [count, setCount] = useState<number>(0);

  console.log("🔁 Parent rendered");

  // ✅ Memoized callback
  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  return (
    <div>
      <h3>Parent Count: {count}</h3>

      <button onClick={() => setCount((c) => c + 1)}>Increment Parent</button>

      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent2;
