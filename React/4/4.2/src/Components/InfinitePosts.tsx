import { useInfiniteQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

const LIMIT = 10;

/** API function */
const fetchPosts = async ({ pageParam }: { pageParam: unknown }): Promise<Post[]> => {
  const page = (pageParam as number) || 1;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const InfinitePosts: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", "infinite"],
    queryFn: fetchPosts,
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // if last page has less items, no more pages
      if (lastPage.length < LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>❌ {error.message}</p>;

  return (
    <div>
      <h2>♾ Infinite Posts</h2>

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load more"
          : "No more posts"}
      </button>
    </div>
  );
};

export default InfinitePosts;
