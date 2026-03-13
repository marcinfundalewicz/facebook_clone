import { getAvatar } from "../utils/avatar";

export default function RightPanel() {
  const users = ["John", "Anna", "Michael"];

  return (
    <div className="right-panel">
      <div className="right-card">
        <h4>Who to follow</h4>

        {users.map((user) => (
          <div className="follow-item" key={user}>
            <img className="avatar small" src={getAvatar(user)} alt={user} />

            <span>{user}</span>
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
