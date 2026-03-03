import client from "./client";

export function login(email, password) {
    return client.post("/api/auth/login", { email, password });
}

export function getPosts() {
    return client.get("/api/posts");
}

export function getFeed(page = 0) {
    return client.get(`/api/posts?page=${page}&size=10`);
}

export function toggleLike(postId) {
        return client.post(`/api/posts/${postId}/reactions`);
}
export function createPost(content) {
    return client.post("/api/posts", {content});
}
export function getComments(postId) {
    return client.get(`/api/posts/${postId}/comments`);
}

export function addComment(postId, content) {
    return client.post(`/api/posts/${postId}/comments`, { content });
}
export const getSocialFeed = () => {
    return client.get("/api/posts/social");
}
export const getFriend = () => {
    return client.get("/api/friends");
}
export const removeFriend = (id) => {
    return client.delete(`/api/friends/${id}`);
}
