export function initForm(posts, onPostAdded) {
    const form = document.getElementById("create-post-form");
    const textarea = document.getElementById("post-content");
    const error = document.getElementById("form-error");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const content = textarea.value.trim();
        if (!content) {
            error.textContent = "Post cannot be empty";
            return;
        }
        error.textContent = "";
        posts.unshift({
            id: Date.now(),
            author: "testuser",
            content,
            createdAt: new Date(),
            likes: 0,
            liked: false
        });
        textarea.value = "";
        onPostAdded();
    });
}