const posts = [
    { slug: "nextjs", title: "Learn Next.js" },
    { slug: "react", title: "React Basics" },
    { slug: "seo", title: "SEO Guide" }
];

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Learn Next.js",
        "description": "A guide to learning Next.js",
        "author": {
            "@type": "Person",
            "name": "Shivam Gupta"
        },
        "datePublished": "2026-03-12"
    };

    return (
        <>
            <div>
                <h1>{post?.title}</h1>
                <p>This page was statically generated.</p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article>
                <h1>Learn Next.js</h1>
                <p>This blog explains Next.js basics.</p>
            </article>
        </>
    );
}