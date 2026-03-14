import { useState } from "react";
import { login } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login: setAuthToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await login(email, password);
      setAuthToken(res.data.token);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-layout">
      {/* LEFT SIDE */}
      <div className="login-hero">
        <div className="hero-content">
          <h1>FacebookClone</h1>
          <p>Connect with friends and the world around you.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-panel">
        <h2>Welcome back</h2>

        <div className="login-social">
          <button className="social-btn">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
            Continue with Google
          </button>

          <button className="social-btn">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" />
            Continue with Apple
          </button>

          <div className="divider">
            <span>or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="primary" type="submit">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}
