'use client';

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

export default function NoStorePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      console.log("Fetching NO-STORE posts...");
      
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        cache: "no-store",
      });
      
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const time = new Date().toLocaleTimeString();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>No Store</h2>
      <p>Rendered at: {time}</p>

      {posts.slice(0, 3).map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

