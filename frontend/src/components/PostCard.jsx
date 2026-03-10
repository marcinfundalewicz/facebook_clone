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
                                     createdAt
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

        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (isNaN(seconds)) return "";

        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(seconds / 3600);

        if (minutes < 1) return "just now";
        if (minutes < 60) return minutes + " min ago";
        if (hours < 24) return hours + " h ago";

        return Math.floor(hours / 24) + " d ago";
    }

    return (
        <article className="post-card">

            <div className="post-header">

                <img
                    className="avatar"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${author}`}
                    alt={author}
                />

                <div className="post-user">
                    <strong>{author}</strong>
                    <div className="time">{timeAgo(createdAt)}</div>
                </div>

            </div>

            <p className="post-content">{content}</p>

            <div className="post-actions">

                <button onClick={handleLike}>
                    {liked ? "❤️" : "🤍"} {likes}
                </button>

                <span>💬 {commentsCount}</span>

            </div>

            <CommentSection postId={id} />

        </article>
    );
}