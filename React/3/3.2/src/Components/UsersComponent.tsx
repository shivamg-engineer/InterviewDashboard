import { useEffect } from "react";
import { fetchUsers } from "../redux/user/userSlice";
import { selectAllUsers } from "../redux/user/usersAdapter";
import { useAppDispatch, useAppSelector } from "../redux/store";
import type { User } from "../types/User";

const UsersComponent = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => selectAllUsers(state.user));
  const { loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>⏳ Loading users...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;
