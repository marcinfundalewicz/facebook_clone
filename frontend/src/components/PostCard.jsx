import { useState, useEffect } from "react";
import { toggleLike } from "../api/api";
import CommentSection from "./CommentSection";

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

    return (
        <article className="post-card">
            <div className="post-header">
                <img
                    className="avatar"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`}
                    alt={author}
                />
                <strong>{author}</strong>
            </div>

            <p className="post-content">{content}</p>

            <footer className="post-footer">
                <button onClick={handleLike}>
                    {liked ? "❤️" : "🤍"} {likes}
                </button>

                <span>💬 {commentsCount}</span>
            </footer>

            <CommentSection postId={id} />
        </article>
    );
}