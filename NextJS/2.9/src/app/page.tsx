import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserGreeting from "./components/UserGreeting";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full rounded-xl border border-black/[.08] p-4 text-sm dark:border-white/[.145]">
          {session?.user ? (
            <div className="flex flex-col gap-1">
              <div>
                Signed in as <span className="font-medium">{session.user.email}</span>
              </div>
              <Link className="underline" href="/dashboard">
                Go to dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div>You are not signed in.</div>
              <Link className="underline" href="/login">
                Go to login
              </Link>
            </div>
          )}
        </div>
        <UserGreeting />
      </main>
    </div>
  );
}
