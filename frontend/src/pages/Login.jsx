import { useState } from "react";
import { login } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login: setAuthToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await login(email, password);
      setAuthToken(res.data.token);
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="login-layout">
      {/* LEFT SIDE */}
      <div className="login-hero">
        <h1>FacebookClone</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-panel">
        <h2>Happening now</h2>
        <h3>Join today.</h3>

        <div className="login-social">
          <button className="social-btn">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
            Sign up with Google
          </button>

          <button className="social-btn">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" />
            Sign up with Apple
          </button>

          <div className="divider">
            <span>or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
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

          <button className="primary" type="submit">
            Sign in
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}
