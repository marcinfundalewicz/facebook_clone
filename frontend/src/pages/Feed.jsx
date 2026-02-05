import { useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    function addPost(content) {
        const newPost = {
            id: Date.now(),
            author: "Ty",
            content,
            likes: 0,
            comments: 0
        };

        setPosts([newPost, ...posts]);
    }

    return (
        <div>
            <CreatePost onAddPost={addPost} />

            {posts.map(post => (
                <PostCard
                    key={post.id}
                    author={post.author}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                />
            ))}
        </div>
    );
}