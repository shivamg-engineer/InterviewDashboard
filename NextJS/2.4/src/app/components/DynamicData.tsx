export default async function DynamicData() {
  // simulate slow data fetching
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = [
    "React",
    "Next.js",
    "Server Components",
    "Streaming UI"
  ];

  return (
    <div>
      <h2>Dynamic Data Loaded</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}