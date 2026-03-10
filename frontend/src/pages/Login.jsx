import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { login as loginRequest } from "../api/api.js";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await loginRequest(email, password);
      login(res.data.token);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
