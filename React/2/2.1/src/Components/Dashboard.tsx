import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>📊 Welcome to Dashboard</h1>
      {/* Navigation inside dahshboard */}
      <nav>
        <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Link to="profiles">Profiles</Link>
      <hr />

      {/* 👇 Nested pages will appear here */}
      <Outlet />
    </div>
  );
}
