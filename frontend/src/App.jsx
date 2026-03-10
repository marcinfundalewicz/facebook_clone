import { useAuth } from "./auth/AuthContext";
import Feed from "./pages/Feed";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar";

export default function App() {
  const { token } = useAuth();
  if (!token) return <Login />;
  return (
    <>
      <Navbar
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      />

      <Feed />
    </>
  );
}
