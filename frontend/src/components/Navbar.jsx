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
    .slice(0, 5); // max 5 wyników

  async function handleAddFriend(id) {
    try {
      await addFriend(id);
      alert("Friend request sent");
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
                <span>{u.username}</span>

                <button onClick={() => handleAddFriend(u.id)}>Add</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-right">
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {dark ? "☀️" : "🌙"}
        </button>

        <img className="avatar small" src={getAvatar("me")} alt="my profile" />

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
