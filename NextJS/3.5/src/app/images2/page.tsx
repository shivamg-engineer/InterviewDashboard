import Image from "next/image";

export default function Page() {
  return (
    <div>
      <h1>Lazy Loading Test</h1>

      <Image
        src="/solo_levelling.jpg"
        alt="Image 1"
        width={800}
        height={500}
      />

      <div style={{ height: "1500px" }} />

      <Image
        src="/solo_levelling.jpg"
        alt="Image 2"
        width={800}
        height={500}
      />

      <div style={{ height: "1500px" }} />

      <Image
        src="/solo_levelling2.jpeg"
        alt="Image 3"
        width={800}
        height={500}
      />
    </div>
  );
}