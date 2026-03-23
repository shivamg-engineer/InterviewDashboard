import { useMemo, useState } from "react";

function expensiveCalculation(num: number): number {
  console.log("🔥 Expensive calculation running...");
  let result = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    result += num;
  }

  return result;
}

export default function ExpensiveCalc() {
  console.log("🔄 Component rendered");

  const [count, setCount] = useState<number>(1);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // ✅ Memoized value
  const calculatedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]); // 👈 Only re-run when count changes

  return (
    <div>
      <h2>Claculated value: {calculatedValue}</h2>
      <h3>Theme: {theme}</h3>

      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
