import { useAuth } from "./auth/AuthContext";
import Feed from "./pages/Feed";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar";

export default function App() {
  const { token, logout } = useAuth();
  if (!token) return <Login />;
  return (
    <>
      <Navbar onLogout={logout} />
      <Feed />
    </>
  );
}
