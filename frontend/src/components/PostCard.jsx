import { useState } from "react";
import { toggleLike } from "../api/api";

export default function PostCard({
                                     id,
                                     author,
                                     content,
                                     likesCount,
                                     commentsCount,
                                     likedByMe
                                 }) {
    const [likes, setLikes] = useState(likesCount ?? 0);
    const [liked, setLiked] = useState(likedByMe ?? false);

    async function handleLike() {
        if (liked) {
            setLikes(prev => prev - 1);
        } else {
            setLikes(prev => prev + 1);
        }
        setLiked(!liked);

        try {
            await toggleLike(id);
        } catch (err) {
            console.error("Like failed", err);

            if (liked) {
                setLikes(prev => prev + 1);
            } else {
                setLikes(prev => prev - 1);
            }
            setLiked(liked);
        }
    }

    return (
        <article>
            <strong>{author}</strong>
            <p>{content}</p>
            <footer>
                <button onClick={handleLike}>
                    {liked ? "❤️" : "🤍"} {likes}
                </button>
                {" | "}
                💬 {commentsCount}
            </footer>
        </article>
    );
}