import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

/** Fetch posts */
const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

/** Update post title */
const updatePostTitle = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}): Promise<Post> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }
  );

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

const OptimisticPosts: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");

  const { data: posts } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: updatePostTitle,

    // 🔥 Optimistic update happens here
    onMutate: async ({ id, title }) => {
      // cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // snapshot previous value
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // optimistically update cache
      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.map((post) =>
          post.id === id ? { ...post, title } : post
        )
      );

      // return context for rollback
      return { previousPosts };
    },

    // ❌ rollback on error
    onError: (_err, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    // 🔄 refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSave = (id: number) => {
    mutation.mutate({ id, title });
    setEditingId(null);
  };

  return (
    <div>
      <h2>⚡ Optimistic Update</h2>

      {posts?.map((post) => (
        <div key={post.id} style={{ marginBottom: "10px" }}>
          {editingId === post.id ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={() => handleSave(post.id)}>
                Save
              </button>
            </>
          ) : (
            <>
              <strong>{post.title}</strong>
              <button
                onClick={() => {
                  setEditingId(post.id);
                  setTitle(post.title);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptimisticPosts;
