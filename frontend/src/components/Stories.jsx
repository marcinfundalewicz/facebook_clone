import { getAvatar } from "../utils/avatar";

const users = [
  "Emma",
  "Michael",
  "Lucas",
  "Sophia",
  "Daniel",
  "Olivia",
  "Noah",
  "Ava",
  "Liam",
  "Mia",
  "James",
  "Isabella",
];

export default function Stories() {
  return (
    <div className="stories">
      {users.map((user) => (
        <div className="story" key={user}>
          <img src={getAvatar(user)} className="avatar story-avatar" />
          <span>{user}</span>
        </div>
      ))}
    </div>
  );
}
