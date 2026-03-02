import { useEffect, useState } from "react";
import { getComments, addComment } from "../api/api";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

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
            authorUsername: "You"
        };

        // optimistic UI
        setComments(prev => [...prev, newComment]);
        setContent("");

        try {
            await addComment(postId, content);
        } catch (err) {
            console.error("Add comment failed", err);
        }
    }

    return (
        <div style={{ marginTop: "10px" }}>
            {comments.map(c => (
                <div key={c.id}>
                    <strong>{c.authorUsername}</strong>: {c.content}
                </div>
            ))}

            <form onSubmit={handleAddComment}>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit">Comment</button>
            </form>
        </div>
    );
}