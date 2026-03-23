'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function UserGreeting(){
    const {data:session, status}=useSession();

   // While session is loading
  if (status === "loading") {
    return <p>Checking session...</p>;
  }

  // If user is logged in
  if(session){
    return (
        <div>
            <p>Welcome, {session.user?.name}</p>
             <button onClick={() => signOut()}>Logout</button>
        </div>
    )
  }

    // If user is NOT logged in
  return (
    <div>
      <p>You are not logged in.</p>
      <button onClick={() => signIn()}>Login</button>
    </div>
  )
}