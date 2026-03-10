import { useEffect, useState } from "react";
import { getUsers, getFriends, addFriend } from "../api/api";

export default function FriendsList() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const usersRes = await getUsers();
        const friendsRes = await getFriends();

        setUsers(usersRes.data);
        setFriends(friendsRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleAdd(userId) {
    try {
      await addFriend(userId);
      const friendsRes = await getFriends();
      setFriends(friendsRes.data);
    } catch (err) {
      console.error("Add friend failed", err);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Friends</h2>

      {friends.length === 0 ? (
        <p>No friends yet 😢</p>
      ) : (
        friends.map((friend) => <div key={friend.id}>{friend.username}</div>)
      )}

      <h2>All users</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.username}
          <button onClick={() => handleAdd(user.id)}>Add friend</button>
        </div>
      ))}
    </div>
  );
}
