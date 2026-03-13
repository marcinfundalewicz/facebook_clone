import { useState, useEffect } from "react";
import { toggleLike } from "../api/api";
import CommentSection from "./CommentSection";

export default function PostCard({
  id,
  author,
  content,
  likesCount,
  commentsCount,
  likedByMe,
  createdAt,
}) {
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
    <div className="post">
      <div className="post-avatar">{author.substring(0, 2).toUpperCase()}</div>

      <div className="post-body">
        <div className="post-header">
          <span className="post-user">{author}</span>
          <span className="post-time">{timeAgo(createdAt)}</span>
        </div>

        <div className="post-content">{content}</div>

        <div className="post-actions">
          <button onClick={handleLike}>
            {liked ? "❤️" : "🤍"} {likes}
          </button>

          <button>💬 {commentsCount}</button>
        </div>

        <CommentSection postId={id} />
      </div>
    </div>
  );
}
