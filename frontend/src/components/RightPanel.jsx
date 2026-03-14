import { getAvatar } from "../utils/avatar";

export default function RightPanel() {
  const suggestions = ["Emma", "Lucas", "Sophia", "Michael"];

  return (
    <div className="right-panel">
      <div className="right-card">
        <h4>Who to follow</h4>

        {suggestions.map((u) => (
          <div className="follow-item" key={u}>
            <img src={getAvatar(u)} className="avatar small" alt={u} />

            <span>{u}</span>
          </div>
        ))}
      </div>

      <div className="right-card">
        <h4>Trending</h4>

        <div className="trend-item">#react</div>
        <div className="trend-item">#springboot</div>
        <div className="trend-item">#java</div>
      </div>
    </div>
  );
}
