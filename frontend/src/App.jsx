import { Routes, Route } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";

export default function App() {
  const { token, logout, loading } = useAuth();

  if (loading) return null;

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar onLogout={logout} />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}
