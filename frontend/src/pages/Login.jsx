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
        <h2>Welcome back</h2>

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

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
