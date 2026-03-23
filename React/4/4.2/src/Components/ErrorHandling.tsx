import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

/** API function (simulated failure) */
const fetchUsers = async (): Promise<User[]> => {
  const shouldFail = Math.random() < 0.7; // 70% failure

  if (shouldFail) {
    throw new Error("❌ Failed to fetch users");
  }

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!res.ok) {
    throw new Error("Server error");
  }

  return res.json();
};

const ErrorHandling: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,

    retry: false, // ❗ disable auto-retry (manual retry only)
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return (
      <div style={styles.errorBox}>
        <p>{error.message}</p>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={styles.button}
        >
          {isFetching ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>👤 Users</h2>

      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorHandling;

const styles: Record<string, React.CSSProperties> = {
  errorBox: {
    border: "1px solid red",
    padding: "12px",
    borderRadius: "6px",
    maxWidth: "400px",
  },
  button: {
    marginTop: "8px",
    padding: "6px 12px",
    cursor: "pointer",
  },
};
