import { useEffect } from "react";
import { fetchUsers } from "../redux/user/userSlice";
import { selectAllUsers } from "../redux/user/usersAdapter";
import { useAppDispatch, useAppSelector } from "../redux/store";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => selectAllUsers(state.user));
  const { loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          {u.name} – {u.email}
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
