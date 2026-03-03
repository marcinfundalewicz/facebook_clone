import { useEffect, useState } from "react";
import { getFriends, removeFriend } from "../api/api";

export default function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFriends() {
            try {
                const res = await getFriends();
                setFriends(res.data);
            } catch (err) {
                console.error("Failed to load friends", err);
            } finally {
                setLoading(false);
            }
        }

        loadFriends();
    }, []);

    async function handleRemove(id) {
        try {
            await removeFriend(id);
            setFriends(prev => prev.filter(f => f.id !== id));
        } catch (err) {
            console.error("Remove failed", err);
        }
    }

    if (loading) return <p>Loading friends...</p>;

    if (friends.length === 0) {
        return (
            <div style={{ marginTop: "20px" }}>
                <h4>No friends yet</h4>
                <p>Add some friends to see social feed 👥</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h4>Your Friends</h4>
            {friends.map(friend => (
                <div
                    key={friend.id}
                    style={{
                        background: "white",
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>{friend.username}</span>
                    <button onClick={() => handleRemove(friend.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}