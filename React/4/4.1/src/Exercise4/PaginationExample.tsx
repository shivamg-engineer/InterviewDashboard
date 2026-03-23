import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const PaginationExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${ITEMS_PER_PAGE}`
        );
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          //  setError(err.message);
          console.error("Failed to fetch users");
        } else {
          console.error("Unknown error occurred");
          //   console.error("Failed to fetch users");
        }
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]); // 👈 refetch when page changes

  return (
    <div style={{ padding: 20 }}>
      <h2>Users (Page {page})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users.length < ITEMS_PER_PAGE}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;
