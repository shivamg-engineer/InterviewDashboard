import { useEffect, useState } from "react";

export default function SearchWithDebounce() {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  useEffect(() => {
    console.log("⏳ Waiting for user to stop typing..");

    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
      console.log("debounced value");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div>
      <h3>search</h3>
      <input
        type="text"
        placeholder="Type hear..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Live input value: {inputValue}</p>
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
}
