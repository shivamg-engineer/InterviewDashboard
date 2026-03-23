// function Child() {
//   console.log("👶 Child rendered");

//   return <h3>I am the Child</h3>;
// }
import React from "react";

// type ChildProps = {
//   value: number;
// };

const Child = React.memo(function Child() {
  console.log("👶 Child rendered");
  return <h3>Child</h3>;
});

export default Child;
