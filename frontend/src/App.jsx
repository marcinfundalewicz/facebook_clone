import { useAuth } from "./auth/AuthContext";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Login from "./pages/Login.jsx";

export default function App() {
    const { token } = useAuth();
    if (!token) return <Login />
    return <Feed />
}