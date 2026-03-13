import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAvatar } from "../utils/avatar";
import PostCard from "../components/PostCard";
import { getUserPosts } from "../api/api";

export default function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getUserPosts(username);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load user posts", err);
      }
    }

    load();
  }, [username]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="avatar large"
          src={getAvatar(username)}
          alt={username}
        />

        <h2>{username}</h2>
      </div>

      <div className="profile-posts">
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
    </div>
  );
}
