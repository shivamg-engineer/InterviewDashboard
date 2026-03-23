import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/usersApi";

const Users: React.FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>❌ {(error as Error).message}</p>;

  return (
    <div>
      <h2>👤 Users</h2>

      {isFetching && <p>🔄 Updating in background...</p>}

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

export default Users;
