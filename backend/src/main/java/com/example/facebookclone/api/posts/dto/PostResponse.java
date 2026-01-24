package com.example.facebookclone.api.posts.dto;

import java.time.LocalDateTime;

public class PostResponse {
    private Long id;
    private String content;
    private String authorUsername;
    private LocalDateTime createdAt;
    private long likesCount;
    private long commentsCount;
    private boolean likedByMe;

    public PostResponse(Long id, String content, String authorUsername, LocalDateTime createdAt, long likesCount, long commentsCount, boolean likedByMe) {
        this.id = id;
        this.content = content;
        this.authorUsername = authorUsername;
        this.createdAt = createdAt;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.likedByMe = likedByMe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(long likesCount) {
        this.likesCount = likesCount;
    }

    public long getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(long commentsCount) {
        this.commentsCount = commentsCount;
    }

    public boolean isLikedByMe() {
        return likedByMe;
    }

    public void setLikedByMe(boolean likedByMe) {
        this.likedByMe = likedByMe;
    }
}
