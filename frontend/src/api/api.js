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
        return client.post('/api/posts/$(postId}/reactions');
}