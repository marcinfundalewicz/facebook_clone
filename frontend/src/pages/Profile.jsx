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
          <img src={getAvatar(username)} className="avatar large" />

          <div className="profile-info">
            <h2>{username}</h2>

            <div className="profile-stats">
              <span>23 posts</span>
              <span>120 followers</span>
              <span>80 following</span>
            </div>
          </div>
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
