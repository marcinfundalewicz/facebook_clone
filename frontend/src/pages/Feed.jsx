import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts, getSocialFeed, createPost } from "../api/api.js";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode] = useState("all");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const res = mode === "all" ? await getPosts() : await getSocialFeed();
        setPosts(res.data.content);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [mode]);

  async function handleAddPost(content) {
    try {
      await createPost(content);
      const res = await getPosts();
      setPosts(res.data.content);
    } catch (err) {
      console.error("Create post failed", err);
    }
  }

  if (loading) {
    return (
      <div className="feed-container">
        {[1, 2, 3].map((i) => (
          <div className="skeleton-post" key={i}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="skeleton skeleton-avatar"></div>
              <div style={{ flex: 1 }}>
                <div className="skeleton skeleton-line"></div>
                <div className="skeleton skeleton-line"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h3>No posts yet</h3>
        <p>Be the first to share something 🚀</p>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <CreatePost onAddPost={handleAddPost} />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          author={post.authorUsername}
          content={post.content}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          likedByMe={post.likedByMe}
        />
      ))}
    </div>
  );
}
