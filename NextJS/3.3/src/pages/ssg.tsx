import { GetStaticProps } from "next";

type SSGPageProps = {
  time: string;
};

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  const time = new Date().toISOString();

  return {
    props: { time },
  };
};

export default function SSGPage({ time }: SSGPageProps) {
  return (
    <div>
      <h1>SSG Page</h1>
      <p>Built at: {time}</p>
    </div>
  );
}