"use client";

import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}





export default function PostsList() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

     const serverTime = new Date().toLocaleTimeString();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts",{
                    next:{revalidate: 10}, // Revalidate data every 10 seconds
                });


                if (!res.ok) {
                    throw new Error("API Error");
                }

                const data: Post[] = await res.json();



                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    return (
        <div>
            
            <h2>Posts: (Revalidated every 30 seconds)</h2>
            <p> Server page : {serverTime}</p>

            {posts.slice(0, 10).map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );

}