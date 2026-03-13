import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAvatar } from "../utils/avatar";
import PostCard from "../components/PostCard";
import { getUserPosts } from "../api/api";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

export default function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getUserPosts(username);

        // TU JEST KLUCZ
        setPosts(res.data.content);
      } catch (err) {
        console.error("Failed to load user posts", err);
      }
    }

    load();
  }, [username]);

  return (
    <div className="layout">
      <Sidebar />

      <div className="feed">
        <div className="profile-header">
          <img
            className="avatar large"
            src={getAvatar(username)}
            alt={username}
          />
          <h2>{username}</h2>
        </div>

        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.authorUsername}
            content={post.content}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            likedByMe={post.likedByMe}
            createdAt={post.createdAt}
          />
        ))}
      </div>

      <RightPanel />
    </div>
  );
}
