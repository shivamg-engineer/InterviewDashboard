export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div>
            <h1>Blog Page</h1>
            <p>Reading post: {slug}</p>
        </div>
    );
}