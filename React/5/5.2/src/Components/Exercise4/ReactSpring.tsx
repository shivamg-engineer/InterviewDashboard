import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const ReactSpring=()=> {

    const containerStyle = {
  height: "40vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

const cardStyle = {
  width: "200px",
  height: "120px",
  background: "#6366f1",
  color: "white",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  cursor: "grab",
  touchAction: "none",
};


  // Spring values for x and y position
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      tension: 300,   // higher = stiffer spring
      friction: 25,   // higher = more resistance
    },
  }));

  // Drag gesture
  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
      });
    }
  );

  return (
    <div style={containerStyle}>
      <animated.div
        {...bind()}
        style={{
          ...cardStyle,
          x,
          y,
        }}
      >
        Drag me
      </animated.div>
    </div>
  );
}

export default ReactSpring;
