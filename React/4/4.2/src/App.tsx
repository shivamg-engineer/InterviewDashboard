import Users from "./Components/Users"
import './App.css'
import Posts from "./Components/Posts"
import PostsWithCache from "./Components/PostsWithCache"
import InfinitePosts from "./Components/InfinitePosts"
import OptimisticPosts from "./Components/OptimisticPosts"
import ErrorHandling from "./Components/ErrorHandling"
import Home from "./pages/Home"
import User1 from "./pages/Users"
import { useState } from "react"

function App() {
  const [page, setPage] = useState<"home" | "users">("home");

  return (
    <>
        <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("users")}>Users</button>
      </nav>

      {page === "home" && <Home />}
      {page === "users" && <User1 />}
    </div>
      <Users/>
      <Posts/>
      <PostsWithCache/>
      <InfinitePosts/>
      <OptimisticPosts/>
      <ErrorHandling/>
    </>
  )
}

export default App
