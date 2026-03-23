import { useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../api/usersApi";

const Home: React.FC = () => {
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
    });
  };

  return (
    <div>
      <h2>🏠 Home</h2>

      <button
        onMouseEnter={handlePrefetch}
        onClick={handlePrefetch}
      >
        Go to Users Page
      </button>
    </div>
  );
};

export default Home;
