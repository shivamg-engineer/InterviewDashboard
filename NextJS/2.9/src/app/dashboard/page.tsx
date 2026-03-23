// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function SessionDebug() {
//   const { data: session } = useSession();

//   useEffect(() => {
//     console.log("SESSION OBJECT:", session);
//   }, [session]);

//   return <div>Check console for session</div>;
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If user not logged in
  if (!session) {
    return <h1>Access Denied</h1>;
  }

  // If user logged in
  return (
    <div>
      <h1>Private Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
    </div>
  );
}