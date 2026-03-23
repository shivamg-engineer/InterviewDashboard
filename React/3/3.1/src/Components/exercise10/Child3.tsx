import React from "react";

type ChildProps = {
  onClick: () => void;
};

export const Child = React.memo(({ onClick }: ChildProps) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child</button>;
});
