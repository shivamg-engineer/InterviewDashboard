import { useQuery } from "@tanstack/react-query";

interface User{
    id:number;
    name:string;
    email:string;
}

// API function
const fetchUsers = async (): Promise<User[]> => {
const res = await fetch("https://jsonplaceholder.typicode.com/users");

if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

const Users: React.FC = () => {
    const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

   if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>❌ {error.message}</p>;

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
}
export default Users;