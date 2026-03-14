import { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(username, email, password);

      alert("Account created");
      navigate("/");
    } catch (err) {
      alert("Register failed");
    }
  }

  return (
    <div className="login-layout">
      <div className="login-hero">
        <div className="login-hero-content">
          <h1>FacebookClone</h1>
          <p>Join the community.</p>
        </div>
      </div>

      <div className="login-panel">
        <h2>Create account</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <button className="primary">Register</button>
        </form>
      </div>
    </div>
  );
}
