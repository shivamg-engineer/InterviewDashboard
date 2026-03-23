import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const FetchUsersWithAxios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
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
      <h2>Users (axios)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUsersWithAxios;

// 🔍 Fetch vs Axios (Quick Comparison)
// Feature	          Fetch API	     Axios
// Built-in	            ✅ Yes	    ❌ No
// JSON parsing 	    ❌ Manual	✅ Automatic
// Error handling	    ❌ Manual	✅ Built-in
// Interceptors	        ❌ No	    ✅ Yes
// Request canceling 	⚠️ Complex	 ✅ Easy
