import { useAuth } from "./auth/AuthContext";
import Feed from "./pages/Feed";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const { token } = useAuth();
  if (!token) return <Login />;
  return (
    <>
      <Navbar onLogout={logout} />

      <div className="layout">
        <Sidebar />

        <Feed />
      </div>
    </>
  );
}
