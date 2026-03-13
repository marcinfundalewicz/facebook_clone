import { useState } from "react";
import { getAvatar } from "../utils/avatar";

export default function CreatePost({ onAddPost }) {
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setPosting(true);
      await onAddPost(text);
      setText("");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="create-post">
      <div className="create-post-header">
        <img className="avatar" src={getAvatar("You")} alt="You" />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
      </div>

      <button className="primary" onClick={handleSubmit} disabled={posting}>
        {posting ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
