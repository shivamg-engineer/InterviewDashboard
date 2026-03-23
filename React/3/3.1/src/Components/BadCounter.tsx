import { useState } from "react";

const BadCounter = () => {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <h2>BadCounterCount:{count}</h2>
      <button onClick={incrementTwice}>+2</button>
    </div>
  );
};

export default BadCounter;
