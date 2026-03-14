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
  return client.post("/api/posts", { content });
}
export function getComments(postId) {
  return client.get(`/api/posts/${postId}/comments`);
}

export function addComment(postId, content) {
  return client.post(`/api/posts/${postId}/comments`, { content });
}
export const getSocialFeed = () => {
  return client.get("/api/posts/social");
};

export const removeFriend = (id) => {
  return client.delete(`/api/friends/${id}`);
};
export const getUsers = () => client.get("/api/users");
export const getFriends = () => client.get("/api/friends");
export const addFriend = (userId) => client.post(`/api/friends/${userId}`);

export function getUserPosts(username) {
  return client.get(`/api/posts/user/${username}`);
}

export function register(username, email, password) {
  return client.post("/api/auth/register", {
    username,
    email,
    password,
  });
}
