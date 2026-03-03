import {useState, useEffect} from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import {getPosts, getSocialFeed, createPost} from "../api/api.js";
import FriendsList from "../components/FriendsList.jsx";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState("all");

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const res =
                    mode === "all"
                        ? await getPosts()
                        : await getSocialFeed();
                setPosts(res.data.content);
            } catch (err) {
                console.error("Failed to load posts", err);
            } finally {
                setLoading(false);
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

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (!loading && posts.length === 0) {
        return (
            <div style={{textAlign: "center", marginTop: "40px"}}>
                <h3>No posts yet</h3>
                <p>Be the first to share something 🚀</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{marginBottom: "20px"}}>
                <button
                    onClick={() => setMode("all")}
                    disabled={mode === "all"}
                    style={{marginRight: "10px"}}
                >
                    All Posts
                </button>

                <button
                    onClick={() => setMode("friends")}
                    disabled={mode === "friends"}
                >
                    Friends Feed
                </button>
            </div>
            <CreatePost onAddPost={handleAddPost}/>
            <FriendsList/>

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