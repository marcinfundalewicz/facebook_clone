import client from "./client";

export function login(email, password) {
    return client.post("/auth/login", { email, password });
}

export function getPosts() {
    return client.get("/api/posts");
}