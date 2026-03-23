interface Post {
  id: number;
  title: string;
}

async function getPosts(): Promise<Post[]> {
  console.log("Fetching FORCE-CACHE posts...");

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });

  return res.json();
}

export default async function ForceCachePosts() {
  const posts = await getPosts();
  const time = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>Force Cache</h2>
      <p>Rendered at: {time}</p>

      {posts.slice(0, 3).map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}