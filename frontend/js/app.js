const form = document.getElementById("create-post-form");
const textarea = document.getElementById("post-content");
const error = document.getElementById("form-error");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const content = textarea.value.trim();
    if(content.length === 0) {
        error.textContent = "Post cannot be empty";
        return;
    }
    if(content.length > 280) {
        error.textContent = "Post is too long (max 280 characters)";
        return;
    }
    error.textContent = "";
    console.log("Post content:", content);
    textarea.value = "";
});