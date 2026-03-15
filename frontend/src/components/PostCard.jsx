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

      setLiked(!newLiked);
      setLikes(newLiked ? likes - 1 : likes + 1);
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
        <Link to={`/profile/${author}`}>
          <img
            className="avatar clickable"
            src={getAvatar(author)}
            alt={author}
          />
        </Link>

        <div className="post-user-info">
          <Link to={`/profile/${author}`} className="post-user clickable">
            {author}
          </Link>

          <div className="post-meta-info">
            @{author} • {timeAgo(createdAt)}
          </div>
        </div>
      </div>

      {/* BODY */}

      <div className="post-body">
        <div className="post-text">
          <div className="post-content">{content}</div>

          <div className="post-actions">
            <span className={liked ? "liked" : ""} onClick={handleLike}>
              👍 {likes}
            </span>

            <span>💬 {commentsCount}</span>

            <span>↗</span>
          </div>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="post"
            className="post-image"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
      </div>

      {/* COMMENTS */}

      <CommentSection postId={id} />
    </div>
  );
}
