import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const DebouncedSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      fetchUsers(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const fetchUsers = async (searchText: string): Promise<void> => {
    setLoading(true);

    try {
      //   const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const res = await fetch(`https://jsonplaceholder.typicode.com/userss`);

      // simulate failure (for learning)
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: User[] = await res.json();

      const filtered = data.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setResults(filtered);
      console.log(filtered);
    } catch (err) {
      setError((err as Error).message);
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔍 Debounced Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {loading && <p>Loading...</p>}
      {error && (
        <div style={styles.errorBox}>
          <p>❌ {error}</p>
          <button onClick={() => fetchUsers(query)} style={styles.button}>
            Retry
          </button>
        </div>
      )}

      {results && (
        <ul>
          {results.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DebouncedSearch;

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
};
