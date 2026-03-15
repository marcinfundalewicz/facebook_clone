import { getAvatar } from "../utils/avatar";

export default function UserPreview({ username }) {
  return (
    <div className="user-preview">
      <img src={getAvatar(username)} className="avatar large" alt={username} />

      <div className="user-preview-info">
        <div className="preview-username">{username}</div>

        <div className="preview-handle">@{username}</div>

        <div className="preview-stats">
          <span>Posts 12</span>
          <span>Followers 5</span>
          <span>Following 3</span>
        </div>
      </div>
    </div>
  );
}
