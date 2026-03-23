import { useState } from "react";
import useCountdown from "../hooks/useCountdown";

const OtpTimer = () => {
  const countdown = useCountdown(30);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Otp Submitted :", otp);
  };

  return (
    <div style={{ maxWidth: "300px", margin: "20px auto" }}>
      <h3>otp Verification</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button type="submit" disabled={countdown === 0}>
          Verify OTP
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        {countdown > 0 ? (
          <>
            Resend OTP in <strong>{countdown}s</strong>
          </>
        ) : (
          <span style={{ color: "red" }}>OTP expired</span>
        )}
      </p>

      {countdown === 0 && (
        <button onClick={() => window.location.reload()}>Resend OTP</button>
      )}
    </div>
  );
};

export default OtpTimer;
