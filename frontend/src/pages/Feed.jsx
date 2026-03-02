import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts, createPost } from "../api/api.js";

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

    async function handleAddPost(content) {
        try {
            await createPost(content);
            const res = await getPosts();
            setPosts(res.data.content);
        } catch (err) {
            console.error("Create post failed", err);
        }
    }

    return (
        <div>
            <CreatePost onAddPost={handleAddPost}/>

            {posts.map(post => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    author={post.authorUsername}
                    content={post.content}
                    likesCount={post.likesCount}
                    commentsCount={post.commentsCount}
                    likedByMe={post.likedByMe}
                />
            ))}
        </div>
    );
}