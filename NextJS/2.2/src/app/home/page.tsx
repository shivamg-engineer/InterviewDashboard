'use client';
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page.</p>

      <button onClick={()=>router.push("/about")} className="px-4 py-2 bg-blue-500 text-white rounded-2xl cursor-pointer">
        Go to About Page
      </button>
    </div>
  );
}