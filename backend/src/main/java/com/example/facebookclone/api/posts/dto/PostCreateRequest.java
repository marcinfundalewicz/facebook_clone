package com.example.facebookclone.api.posts.dto;

import jakarta.validation.constraints.NotBlank;

public class PostCreateRequest {

    @NotBlank
    private String content;
    private String imageUrl;

    public @NotBlank String getContent() {
        return content;
    }

    public void setContent(@NotBlank String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
