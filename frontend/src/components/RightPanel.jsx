import { getAvatar } from "../utils/avatar";

export default function RightPanel() {
  const online = ["Emma", "Lucas", "Sophia", "Daniel", "Olivia"];

  const suggestions = ["Emma", "Lucas", "Sophia", "Michael"];

  const groups = [
    "Travel Lovers",
    "Food & Recipes",
    "Fitness Motivation",
    "Nature Photography",
  ];

  const activity = [
    { user: "Lucas", text: "liked Emma's photo" },
    { user: "Emma", text: "commented on Michael's post" },
    { user: "Sophia", text: "shared a new photo" },
  ];

  return (
    <div className="right-panel">
      {/* PEOPLE ONLINE */}

      <div className="right-card">
        <h4>🟢 People online</h4>

        {online.map((u) => (
          <div className="online-item" key={u}>
            <div className="online-avatar">
              <img src={getAvatar(u)} className="avatar small" alt={u} />
              <span className="online-dot"></span>
            </div>

            <span>{u}</span>
          </div>
        ))}
      </div>

      {/* WHO TO FOLLOW */}

      <div className="right-card">
        <h4>👥 Who to follow</h4>

        {suggestions.map((u) => (
          <div className="follow-item" key={u}>
            <img src={getAvatar(u)} className="avatar small" alt={u} />

            <span>{u}</span>

            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

      {/* TRENDING */}

      <div className="right-card">
        <h4>🔥 Trending</h4>

        <div className="trend-item">#summer</div>
        <div className="trend-item">#travel</div>
        <div className="trend-item">#food</div>
        <div className="trend-item">#weekend</div>
        <div className="trend-item">#photography</div>
      </div>

      {/* GROUPS */}

      <div className="right-card">
        <h4>👥 Suggested groups</h4>

        {groups.map((g) => (
          <div className="trend-item" key={g}>
            {g}
          </div>
        ))}
      </div>

      {/* ACTIVITY */}

      <div className="right-card">
        <h4>⚡ Latest activity</h4>

        {activity.map((a, i) => (
          <div className="activity-item" key={i}>
            <img
              src={getAvatar(a.user)}
              className="avatar small"
              alt={a.user}
            />

            <span>
              <b>{a.user}</b> {a.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
