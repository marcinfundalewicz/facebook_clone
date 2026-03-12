import { useEffect, useState } from "react";
import { getComments, addComment } from "../api/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getComments(postId);
        setComments(res.data);
      } catch (err) {
        console.error("Load comments failed", err);
      }
    }
    load();
  }, [postId]);

  async function handleAddComment(e) {
    e.preventDefault();
    if (!content.trim()) return;

    const newComment = {
      id: Date.now(),
      content,
      authorUsername: "You",
      createdAt: new Date(),
    };

    setComments((prev) => [...prev, newComment]);
    setContent("");

    try {
      setSending(true);
      await addComment(postId, content);
    } catch (err) {
      console.error("Add comment failed", err);
    } finally {
      setSending(false);
    }
  }

  function timeAgo(date) {
    if (!date) return "";

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);

    if (minutes < 1) return "just now";
    if (minutes < 60) return minutes + " min ago";
    if (hours < 24) return hours + " h ago";

    return Math.floor(hours / 24) + " d ago";
  }

  return (
    <div className="comments">
      {comments.map((c) => (
        <div className="comment" key={c.id}>
          <div className="avatar">
            {c.authorUsername.substring(0, 2).toUpperCase()}
          </div>

          <div className="comment-bubble">
            <strong>{c.authorUsername}</strong>
            <div>{c.content}</div>

            <div className="comment-time">{timeAgo(c.createdAt)}</div>
          </div>
        </div>
      ))}

      <div className="comment-input">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />

        <button onClick={handleAddComment} disabled={sending}>
          {sending ? "Sending..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
