import { useEffect, useState, useRef } from "react";
import { getComments, addComment } from "../api/api";
import { getAvatar } from "../utils/avatar";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

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

    // scroll tylko po dodaniu komentarza
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function timeAgo(date) {
    if (!date) return "";

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);

    if (minutes < 1) return "now";
    if (minutes < 60) return minutes + "m";
    if (hours < 24) return hours + "h";

    return Math.floor(hours / 24) + "d";
  }

  return (
    <div className="comments">
      {comments.map((c) => (
        <div className="comment" key={c.id}>
          <img
            className="avatar small"
            src={getAvatar(c.authorUsername)}
            alt={c.authorUsername}
          />

          <div className="comment-content">
            <div className="comment-header">
              <span className="comment-author">{c.authorUsername}</span>
              <span className="comment-time">{timeAgo(c.createdAt)}</span>
            </div>

            <div className="comment-text">{c.content}</div>
          </div>
        </div>
      ))}

      <div ref={bottomRef}></div>

      <div className="comment-input">
        <img className="avatar small" src={getAvatar("You")} alt="You" />

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddComment(e);
            }
          }}
          placeholder="Write a comment..."
        />

        <button
          className="primary"
          onClick={handleAddComment}
          disabled={sending}
        >
          {sending ? "Sending..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
