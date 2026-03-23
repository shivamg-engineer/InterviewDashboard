import { useFetch } from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function UsersComponent() {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} – {user.email}
        </li>
      ))}
    </ul>
  );
}

export default UsersComponent;
