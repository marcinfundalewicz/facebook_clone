import { getAvatar } from "../utils/avatar";

export default function RightPanel() {
  const suggestions = ["Emma", "Lucas", "Sophia", "Michael"];

  const groups = ["React Developers", "Java Backend", "UI Designers"];

  const activity = [
    "Lucas liked a post",
    "Emma commented",
    "Sophia followed Daniel",
  ];

  return (
    <div className="right-panel">
      {/* WHO TO FOLLOW */}

      <div className="right-card">
        <h4>Who to follow</h4>

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
        <h4>Trending</h4>

        <div className="trend-item">#react</div>
        <div className="trend-item">#springboot</div>
        <div className="trend-item">#java</div>
        <div className="trend-item">#webdev</div>
        <div className="trend-item">#typescript</div>
      </div>

      {/* GROUPS */}

      <div className="right-card">
        <h4>Suggested groups</h4>

        {groups.map((g) => (
          <div className="trend-item" key={g}>
            {g}
          </div>
        ))}
      </div>

      {/* ACTIVITY */}

      <div className="right-card">
        <h4>Latest activity</h4>

        {activity.map((a, i) => (
          <div className="trend-item" key={i}>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
