import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // 1️⃣ Show alert
    alert("✅ Login successful!");

    // 2️⃣ Navigate to dashboard
    navigate("/dashboard");
  }

  return (
    <div>
      <h2>🔐 Login Page</h2>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
