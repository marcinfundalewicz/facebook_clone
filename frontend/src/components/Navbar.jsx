export default function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <div className="logo">FacebookClone</div>

      <div className="nav-links">
        <button>Feed</button>
        <button>Friends</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
