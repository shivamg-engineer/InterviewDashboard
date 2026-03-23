import React from "react";

type ChildProps = {
  onClick: () => void;
};

const Child = React.memo(({ onClick }: ChildProps) => {
  console.log("🔁 Child rendered");

  return <button onClick={onClick}>Click Child</button>;
});

export default Child;
