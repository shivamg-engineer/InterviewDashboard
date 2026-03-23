import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | My Website</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <main>
        <h1>Welcome to My Website</h1>
        <p>
          <Link href="/about">Go to About Us</Link>
        </p>
      </main>
    </>
  );
}

