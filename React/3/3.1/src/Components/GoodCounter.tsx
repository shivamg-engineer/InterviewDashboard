import { useState } from "react";

const GoodCounter = () => {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={incrementTwice}>+2</button>
    </div>
  );
};

export default GoodCounter;
