import { useState, useEffect } from "react";
import { getUsers, addFriend } from "../api/api";
import { getAvatar } from "../utils/avatar";

export default function Navbar({ onLogout }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    }

    loadUsers();
  }, []);

  const filtered = users
    .filter((u) => u.username.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  async function handleAddFriend(id) {
    try {
      await addFriend(id);
      setSearch(""); // zamknij search
    } catch (err) {
      console.error("Friend request failed", err);
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="logo">FacebookClone</div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="search-results">
            {filtered.map((u) => (
              <div className="search-item" key={u.id}>
                <img
                  src={getAvatar(u.username)}
                  className="avatar small"
                  alt={u.username}
                />

                <span>{u.username}</span>

                <button
                  className="add-btn"
                  onClick={() => handleAddFriend(u.id)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <div className="nav-icon">🔔</div>

        <div className="nav-icon">💬</div>

        <div className="nav-icon" onClick={toggleDarkMode}>
          {dark ? "☀️" : "🌙"}
        </div>

        <img src={getAvatar("You")} className="avatar small" alt="profile" />

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
