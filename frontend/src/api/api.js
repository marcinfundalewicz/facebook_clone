import client from "./client";

export function login(email, password) {
    return client.post("/api/auth/login", { email, password });
}

export function getPosts() {
    return client.get("/api/posts");
}