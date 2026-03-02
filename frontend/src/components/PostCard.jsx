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