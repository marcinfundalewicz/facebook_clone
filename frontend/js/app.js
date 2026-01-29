const form = document.getElementById("create-post-form");
const textarea = document.getElementById("post-content");
const error = document.getElementById("form-error");
const feed = document.getElementById("feed");

const posts = [
    {
        id: 1,
        author: "testuser",
        content: "Hello world!",
        likes: 0,
        createdAt: new Date()
    }
];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const content = textarea.value.trim();
    if (content.length === 0) {
        error.textContent = "Post cannot be empty";
        return;
    }
    if (content.length > 280) {
        error.textContent = "Post is too long (max 280 characters)";
        return;
    }
    error.textContent = "";
    console.log("Post content:", content);
    textarea.value = "";
});

function renderPosts(posts) {
    posts.forEach(post => {
        const article = document.createElement("article");
        article.innerHTML = `
      <header>
        <strong>${post.author}</strong>
        <time>${post.createdAt.toLocaleString()}</time>
      </header>
      <p>${post.content}</p>
      <footer>
        <button>Like</button>
        <span>${post.likes} likes</span>
      </footer>
    `;
        feed.appendChild(article);
    });
}

renderPosts(posts);
