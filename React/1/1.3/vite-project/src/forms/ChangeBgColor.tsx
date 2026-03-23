import { useEffect, useState } from "react";

export const ChangeBgColor = () => {
  const [bgColor, setBgColor] = useState("");

  //   const handleClick = () => {
  //     setBgColor(bgColor === "white" ? "lightBlue" : "white");
  //   };
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;

    // cleanup (optional, good practice)
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [bgColor]);

  return (
    <button
      onClick={() => setBgColor(bgColor === "white" ? "lightcoral" : "white")}
    >
      Click to change background color
    </button>
  );
};
