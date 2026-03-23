import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { Contact } from "./Components/Contact";
import UserProfile from "./Components/UserProfile";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import { lazy, Suspense } from "react";
import HeavyComponent from "./Components/HeavyComponent/HeavyComponent";

// ✅ LAZY LOAD HeavyComponent
// const HeavyComponent = lazy(
//   () => import("./Components/HeavyComponent/HeavyComponent")
// );

function App() {
  const isAuthenticated = true; // 🔁 change to true to test

  return (
    <>
      <Router>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/heavy">Heavy</Link>
        </nav>
        <Suspense fallback={<h3>⏳ Loading heavy Component...</h3>}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested routes */}
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/user/:id" element={<UserProfile />} />

            <Route path="/" element={<Login />} />
            <Route path="/heavy" element={<HeavyComponent />} />

            {/* ⭐ Wildcard route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
