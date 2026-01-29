export function renderPosts(posts) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    posts.forEach(post => {
        const article = document.createElement("article");
        article.innerHTML = `
      <header>
        <strong>${post.author}</strong>
        <time datetime="${post.createdAt.toISOString()}">
            ${post.createdAt.toLocaleString()}
        </time>
      </header>
      <p>${post.content}</p>
    `;
        const footer = document.createElement("footer");
        const button = document.createElement("button");
        button.textContent = post.liked ? "Unlike" : "Like";
        button.setAttribute("aria-pressed", post.liked);
        button.setAttribute("aria-label", post.liked ? "Unlike post" : "Like post");
        const span = document.createElement("span");
        span.textContent = `${post.likes} likes`;
        button.addEventListener("click", () => {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderPosts(posts);
        });
        footer.append(button, span);
        article.appendChild(footer);
        feed.appendChild(article);
    });
}