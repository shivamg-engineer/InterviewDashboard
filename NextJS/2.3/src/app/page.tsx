import Image from "next/image";
import Counter from "./components/Counter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* static section */}
      <h1>Home Page</h1>
      <p>Welcome to the Home page.</p>

      {/* Dynamic section */}
      <Counter />
    </div>
  );
}
