import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  const blogs: Record<string, any> = {
    "nextjs-seo": {
      title: "Next.js SEO Guide",
      description: "Learn how to optimize Next.js apps for search engines.",
      image: "/images/nextjs-seo.png",
    },
    "react-performance": {
      title: "React Performance Tips",
      description: "Improve React app performance with best practices.",
      image: "/images/react-performance.png",
    },
  };

  return blogs[slug];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;   // ✅ unwrap params
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
      type: "article",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;   // ✅ unwrap params
  const blog = await getBlog(slug);

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </main>
  );
}