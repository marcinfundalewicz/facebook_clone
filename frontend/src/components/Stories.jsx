import { getAvatar } from "../utils/avatar";

const users = [
  "Emma",
  "Michael",
  "Lucas",
  "Sophia",
  "Daniel",
  "Olivia",
  "Noah",
];

export default function Stories() {
  return (
    <div className="stories">
      {users.map((u) => (
        <div className="story" key={u}>
          <img src={getAvatar(u)} className="avatar story-avatar" />
          <span>{u}</span>
        </div>
      ))}
    </div>
  );
}
