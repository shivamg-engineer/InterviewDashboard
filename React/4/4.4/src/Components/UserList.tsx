import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";
import SkeletonLoader from "./skeletonLoader";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await getUsers();

      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError(response.error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};
export default UserList;
