import { useAuth } from "../auth/AuthContext";

export default function Navbar({ onLogout }) {
  const { token } = useAuth();

  const username = "testuser"; // na razie prosto

  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="navbar">
      <div className="logo">FacebookClone</div>

      <div className="nav-right">
        <div className="user-badge">
          <div className="avatar small">{initials}</div>
          <span className="username">{username}</span>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
