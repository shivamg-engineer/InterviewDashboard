import Head from "next/head";

export default function BlogPost() {
  return (
    <>
      <Head>
        <title>Understanding Next.js SEO</title>

        <meta
          name="description"
          content="Learn how to improve SEO in Next.js using metadata, Open Graph tags, and server-side rendering."
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Understanding Next.js SEO" />
        <meta
          property="og:description"
          content="A guide to optimizing Next.js applications for search engines and social media previews."
        />
        <meta
          property="og:image"
          content="https://example.com/images/nextjs-seo.png"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://example.com/blog/nextjs-seo" />
      </Head>

      <main>
        <h1>Understanding Next.js SEO</h1>
        <p>
          This blog post explains how metadata and Open Graph tags help improve
          SEO and link previews for modern web applications.
        </p>
      </main>
    </>
  );
}