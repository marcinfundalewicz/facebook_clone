import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts, getSocialFeed, createPost } from "../api/api.js";
import Toast from "../components/Toast";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const mode = "all";

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const res = mode === "all" ? await getPosts() : await getSocialFeed();
        setPosts(res.data.content);
      } catch (err) {
        console.error("Failed to load posts", err);
        setError("Failed to load feed");
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

      window.scrollTo({ top: 0, behavior: "smooth" });

      setToast("Post created ✅");
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

  if (error) {
    return <div className="loader">{error}</div>;
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
    <div className="layout">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* FEED */}
      <div className="feed">
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
            createdAt={post.createdAt}
          />
        ))}
      </div>

      {/* RIGHT PANEL */}
      <RightPanel />

      {/* TOAST */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
