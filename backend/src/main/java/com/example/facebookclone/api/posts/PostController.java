package com.example.facebookclone.api.posts;

import com.example.facebookclone.api.posts.dto.PostCreateRequest;
import com.example.facebookclone.api.posts.dto.PostResponse;
import com.example.facebookclone.domain.user.User;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public Page<PostResponse> getFeed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return postService.getFeed(page, size);
    }

    @PostMapping
    public void createPost(
            @Valid @RequestBody PostCreateRequest request,
            @AuthenticationPrincipal User user
            ) {
        postService.create(request, user);
    }

    @GetMapping("/{id}")
    public void getPost(@PathVariable Long id) {}

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {}

    @PostMapping("/{id}/reactions")
    public void react(@PathVariable Long id) {}

    @PostMapping("/{id}/comments")
    public void comment(@PathVariable Long id) {}
}
