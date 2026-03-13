import { useState, useEffect } from "react";
import { toggleLike } from "../api/api";
import CommentSection from "./CommentSection";
import { getAvatar } from "../utils/avatar";
import { useNavigate } from "react-router-dom";

export default function PostCard({
  id,
  author,
  content,
  likesCount,
  commentsCount,
  likedByMe,
  createdAt,
}) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(likesCount ?? 0);
  const [liked, setLiked] = useState(likedByMe ?? false);

  useEffect(() => {
    setLikes(likesCount ?? 0);
  }, [likesCount]);

  useEffect(() => {
    setLiked(likedByMe ?? false);
  }, [likedByMe]);

  async function handleLike() {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    try {
      await toggleLike(id);
    } catch (err) {
      console.error("Like failed", err);
      setLiked(liked);
      setLikes(likes);
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
      {/* HEADER */}
      <div className="post-header">
        <img
          className="avatar clickable"
          src={getAvatar(author)}
          alt={author}
          onClick={() => navigate(`/profile/${author}`)}
        />

        <div className="post-user-info">
          <div
            className="post-user clickable"
            onClick={() => navigate(`/profile/${author}`)}
          >
            {author}
          </div>
          <div className="time">{timeAgo(createdAt)}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="post-content">{content}</div>

      {/* ACTIONS */}
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`like-button ${liked ? "liked" : ""}`}
        >
          {liked ? "❤️" : "🤍"} {likes}
        </button>

        <button>💬 {commentsCount}</button>
      </div>

      {/* COMMENTS */}
      <CommentSection postId={id} />
    </div>
  );
}
