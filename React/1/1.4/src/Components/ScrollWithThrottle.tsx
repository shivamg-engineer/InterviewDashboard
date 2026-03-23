import { useEffect, useRef, useState } from "react";

export default function ScrollWithThrottle() {
  const [scrollY, setScrollY] = useState<number>(0);

  const lastRun = useRef<number>(0); // stores last execution time

  useEffect(() => {
    function handleScroll() {
      const now = Date.now();

      // ⛔ Throttle check
      if (now - lastRun.current < 200) {
        return; // skip update
      }

      lastRun.current = now;
      setScrollY(window.scrollY);
      console.log("📏 Scroll position updated:", window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h2>Scroll Y: {scrollY}</h2>
      <p>Scroll down to see throttling in action</p>
    </div>
  );
}
