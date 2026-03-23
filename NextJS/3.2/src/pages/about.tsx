import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | My Website</title>
        <meta
          name="description"
          content="Learn more about our company, our mission, and the services we provide."
        />
      </Head>

      <main>
        <h1>About Us</h1>
        <p>
          Welcome to our website. Here you can learn more about our mission,
          values, and what we offer to our users.
        </p>
      </main>
    </>
  );
}

