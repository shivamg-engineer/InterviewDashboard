type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPost({ params }: BlogPageProps) {

     const { slug } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Blog Post: {slug}
      </h1>

      <p className="text-gray-700">
        This is the content for {slug}.
      </p>
    </div>
  );
}