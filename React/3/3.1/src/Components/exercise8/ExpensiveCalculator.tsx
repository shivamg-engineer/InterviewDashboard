import { useMemo, useState } from "react";

function ExpensiveCalculator() {
  const [number, setNumber] = useState<number>(5);
  const [count, setCount] = useState<number>(0);

  function slowFactorial(n: number): number {
    console.log("🧮 Calculating factorial...");

    let result = 1;
    for (let i = 1; i <= n; i++) {
      // simulate heavy work
      for (let j = 0; j < 1_000_000; j++) {}
      result *= i;
    }
    return result;
  }

  // ✅ Memoized calculation
  const factorial = useMemo(() => {
    return slowFactorial(number);
  }, [number]);

  return (
    <div>
      <h3>Factorial Calculator</h3>

      <input
        type="number"
        value={number}
        min={0}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <p>
        <strong>Result:</strong> {factorial}
      </p>

      <button onClick={() => setCount((c) => c + 1)}>
        Re-render Parent ({count})
      </button>
    </div>
  );
}

export default ExpensiveCalculator;
