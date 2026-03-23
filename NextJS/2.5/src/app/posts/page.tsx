// import PostsList from "@/app/components/PostsList";

import NoStorePosts from "../components/NoStorePosts";
import ForceCachePosts from "../components/ForceCachePosts";

// export default function PostsPage() {
//   return (
//     <div>
//       <h1>Posts Page</h1>
//       <PostsList />
//     </div>
//   );
// }

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // cache + revalidate every 30s
    cache: "force-cache", // Use cache if available, otherwise fetch from network
    // cache:"no-cache"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export const revalidate = 10;

export default async function PostsPage() {
  const posts = await getPosts();

  const serverTime = new Date().toLocaleTimeString();

  return (
    <div>
      <h1>Posts</h1>

      <p>Server Time: {serverTime}</p>

      {posts.slice(0, 10).map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}

      <div>
        <h1>Caching Strategy Comparison</h1>

        <ForceCachePosts />
        <hr />
        <NoStorePosts />
      </div>
    </div>
  );  
}