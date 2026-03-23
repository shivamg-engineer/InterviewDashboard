"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const linkClass = (path: string) => {

        if (path === "/") {
            return pathname === "/"
                ? "text-blue-600 font-bold"
                : "text-gray-600";
        }

         return pathname.startsWith(path)
      ? "text-blue-600 font-bold"
      : "text-gray-600";

    }


    return (
        <nav className="flex gap-5 p-2">
            <Link href="/" className={linkClass("/")}>
                Home
            </Link>

            <Link href="/about" className={linkClass("/about")}>
                About
            </Link>

            <Link href="/blog" className={linkClass("/blog")}>
                Blog
            </Link>
        </nav>
    )
}