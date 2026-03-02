import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts } from "../api/api.js";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await getPosts();
                setPosts(res.data.content);
            } catch (err) {
                console.error("Failed to load posts", err);
            }
        }

        loadPosts();
    }, []);

    return (
        <div>
            <CreatePost onAddPost={() => {}}/>

            {posts.map(post => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    author={post.authorUsername}
                    content={post.content}
                    likes={post.likesCount}
                    comments={post.commentsCount}
                    likedByMe={post.likedByMe}
                />
            ))}
        </div>
    );
}