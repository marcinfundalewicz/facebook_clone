export default function Navbar({ onLogout }) {
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
  }

  return (
    <div className="navbar">
      <div className="logo">FacebookClone</div>

      <div className="nav-links">
        <button onClick={toggleDarkMode}>🌙</button>

        <div className="avatar small">YO</div>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
