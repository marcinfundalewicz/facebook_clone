import { useState, useEffect } from "react";
import { toggleLike } from "../api/api";
import CommentSection from "./CommentSection";
import { getAvatar } from "../utils/avatar";
import { Link } from "react-router-dom";

export default function PostCard({
  id,
  author,
  content,
  imageUrl,
  likesCount,
  commentsCount,
  likedByMe,
  createdAt,
  onPostUpdated,
}) {
  const [likes, setLikes] = useState(likesCount ?? 0);
  const [liked, setLiked] = useState(likedByMe ?? false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    setLikes(likesCount ?? 0);
  }, [likesCount]);

  async function handleLike() {
    if (likeLoading) return;

    setLikeLoading(true);

    const newLiked = !liked;

    setLiked(newLiked);
    setLikes((prev) => prev + (newLiked ? 1 : -1));

    try {
      await toggleLike(id);
      onPostUpdated();
    } catch (err) {
      console.error("Like failed", err);

      setLiked(!newLiked);
      setLikes((prev) => prev + (newLiked ? -1 : 1));
    } finally {
      setLikeLoading(false);
    }
  }

  function timeAgo(date) {
    if (!date) return "";

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);

    if (minutes < 1) return "just now";
    if (minutes < 60) return minutes + "m";
    if (hours < 24) return hours + "h";

    return Math.floor(hours / 24) + "d";
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/profile/${author}`}>
          <img
            className="avatar clickable"
            src={getAvatar(author)}
            alt={author}
          />
        </Link>

        <div className="post-user-info">
          <Link to={`/profile/${author}`} className="post-user-clickable">
            {author}
          </Link>

          <div className="post-meta-info">
            @{author} • {timeAgo(createdAt)}
          </div>
        </div>

        <div className="post-options">•••</div>
      </div>

      <div className="post-body">
        <p className="post-content">{content}</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="post"
            className="post-image"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </div>

      <div className="post-stats">
        <div className="post-left-stats">
          👍 ❤️ 😂
          <span className="likes-count">
            {likes} {likes === 1 ? "like" : "likes"}
          </span>
        </div>

        <div className="post-right-stats">
          {commentsCount} comments • 124 views
        </div>
      </div>

      <div className="post-buttons">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={liked ? "liked" : ""}
        >
          👍 {liked ? "Liked" : "Like"}
        </button>

        <button>💬 Comment</button>

        <button>↗ Share</button>
      </div>

      {commentsCount > 0 && (
        <div className="view-comments">View {commentsCount} comments</div>
      )}

      <div className="post-divider"></div>

      <CommentSection postId={id} />
    </div>
  );
}
