export default function PostCard({ author, content, likes, comments }) {
    return (
        <article>
            <strong>{author}</strong>
            <p>{content}</p>
            <footer>
                👍 {likes} | 💬 {comments}
            </footer>
        </article>
    );
}