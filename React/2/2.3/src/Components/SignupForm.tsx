import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const checkEmailExists = (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingEmails = ["test@gmail.com", "admin@gmail.com"];
        resolve(existingEmails.includes(email));
      }, 1000); // pretend API delay
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1️⃣ Email format validation
    if (!emailRegex.test(email)) {
      setError("❌ Invalid email format");
      return;
    }

    // 2️⃣ API check
    setLoading(true);
    const emailExists = await checkEmailExists(email);
    setLoading(false);

    if (emailExists) {
      setError("❌ Email already registered");
      return;
    }

    // 3️⃣ Success
    setSuccess("✅ Signup successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : "Sign Up"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default SignupForm;
