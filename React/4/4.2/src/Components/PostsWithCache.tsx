import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

/** API function */
const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const PostsWithCache: React.FC = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery<
    Post[],
    Error
  >({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // 🔥 caching & background refetch options
    staleTime: 1000 * 30, // 30 seconds How long data is considered fresh
    
    // cacheTime: 1000 * 60 * 5,   // 5 minutes
    // In TanStack Query v5, cacheTime was renamed to gcTime.

    gcTime: 1000 * 60 * 5, // 5 minutes (was cacheTime) When unused cache is removeds

    refetchOnWindowFocus: true, // Refetch stale data on tab focus
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>❌ {error.message}</p>;

  return (
    <div>
      <h2>🗂 Cached Posts</h2>

      {isFetching && <p>🔄 Updating in background...</p>}

      <ul>
        {data?.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsWithCache;
