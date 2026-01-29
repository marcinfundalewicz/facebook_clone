import { posts } from "./data.js";
import { renderPosts } from "./feed.js";
import { initForm } from "./form.js";

initForm(posts, () => {
    renderPosts(posts);
});

renderPosts(posts);

