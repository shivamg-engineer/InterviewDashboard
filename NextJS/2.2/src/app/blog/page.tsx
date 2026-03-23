import Link from "next/link";


export default function BlogIndex() {
    const posts = [
        { title: "Next.js Guide", slug: "nextjs-guide" },
        { title: "React Basics", slug: "react-basics" },
        { title: "App Router Tutorial", slug: "app-router-tutorial" },
    ];

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}