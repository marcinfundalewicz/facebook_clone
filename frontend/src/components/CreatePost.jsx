import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit" disabled={posting}>
        {posting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
