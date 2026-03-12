import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { login as loginApi } from "../api/api";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await loginApi(email, password);

      login(res.data.token); // ← zapisujemy JWT
    } catch (error) {
      alert("Login failed");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>FacebookClone</h1>

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
          Login
        </button>
      </form>
    </div>
  );
}
