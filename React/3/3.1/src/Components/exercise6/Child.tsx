import React from "react";

type ChildProps = {
  title: string;
};
export const Child = React.memo(({ title }: ChildProps) => {
  console.log("🔁 Child rendered");

  return <h3>{title}</h3>;
});
// export const Child = ({ title }: ChildProps) => {
//   console.log("🔁 Child rendered");

//   return <h3>{title}</h3>;
// };
