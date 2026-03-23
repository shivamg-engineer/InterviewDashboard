import React from "react";

const Card = React.memo(({title, children }) => {
    console.log("card re-rendered")
  return <div style={{ border: "1px solid black", padding: "10px" }}>
    <h1>{title}</h1>
    {children}
    </div>;
});
export default Card;