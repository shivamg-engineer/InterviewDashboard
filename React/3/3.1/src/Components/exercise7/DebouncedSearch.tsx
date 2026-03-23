import { useEffect, useState } from "react";

function DebouncedSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // ⏳ Start debounce timer
    const timerId = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    // 🧹 Cleanup: cancel previous timer
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  return (
    <div style={{ maxWidth: 300 }}>
      <h3>Search</h3>

      <input
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>
        <strong>Debounced Value:</strong> {searchQuery}
      </p>
    </div>
  );
}
export default DebouncedSearch;
