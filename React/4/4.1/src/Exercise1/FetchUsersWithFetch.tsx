import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
// fetch("https://jsonplaceholder.typicode.com/users")

const FetchUsersWithFetch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  });
  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users (Fetch API)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUsersWithFetch;

// 🔍 Fetch vs Axios (Quick Comparison)
// Feature	          Fetch API	     Axios
// Built-in	            ✅ Yes	    ❌ No
// JSON parsing 	    ❌ Manual	✅ Automatic
// Error handling	    ❌ Manual	✅ Built-in
// Interceptors	        ❌ No	    ✅ Yes
// Request canceling 	⚠️ Complex	 ✅ Easy
