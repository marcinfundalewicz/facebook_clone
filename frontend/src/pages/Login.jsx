import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div className="login-layout">
      <div className="login-hero">
        <div className="login-hero-content">
          <h1>FacebookClone</h1>

          <p>Connect with friends and the world around you.</p>
        </div>
      </div>

      <div className="login-panel">
        <h2>Sign in</h2>

        <p className="login-subtitle">
          Connect with friends and the world around you.
        </p>

        <div className="login-social">
          <button className="social-btn">
            <img src="/google.svg" alt="google" />
            Sign in with Google
          </button>

          <button className="social-btn">
            <img src="/apple.svg" alt="apple" />
            Sign in with Apple
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary">Sign in</button>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}
