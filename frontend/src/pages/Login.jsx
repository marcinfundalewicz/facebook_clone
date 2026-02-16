import { useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await api.post("/auth/login", {
            email,
            password
        });

        login(res.data.token);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button>Login</button>
        </form>
    );
}