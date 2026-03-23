import { useCounterStore } from "../Context/store/counterStore";

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h2>Counter:{count}</h2>

      <button onClick={increment}>+ Increment</button>
      <button onClick={decrement}>- Decrement</button>
    </div>
  );
}
