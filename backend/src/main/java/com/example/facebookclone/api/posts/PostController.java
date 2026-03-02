package com.example.facebookclone.api.posts;

import com.example.facebookclone.api.posts.dto.PostCreateRequest;
import com.example.facebookclone.api.posts.dto.PostResponse;
import com.example.facebookclone.api.reactions.ReactionService;
import com.example.facebookclone.domain.reaction.Reaction;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.exception.UnauthorizedException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final ReactionService reactionService;

    public PostController(PostService postService, ReactionService reactionService) {
        this.postService = postService;
        this.reactionService = reactionService;
    }

    @GetMapping
    public Page<PostResponse> getFeed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            org.springframework.security.core.Authentication authentication
    ) {

        User user = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            user = (User) authentication.getPrincipal();
        }

        return postService.getFeed(page, size, user);
    }

    @PostMapping
    public void createPost(
            @Valid @RequestBody PostCreateRequest request,
            @AuthenticationPrincipal User user
            ) {
        if (user == null) {
            throw new UnauthorizedException("Login required");
        }
        postService.create(request, user);
    }

    @GetMapping("/{id}")
    public void getPost(@PathVariable Long id) {}

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {}

    @PostMapping("/{id}/reactions")
    public void react(
            @PathVariable Long id,
            org.springframework.security.core.Authentication authentication
    ) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new UnauthorizedException("Login required");
        }

        reactionService.toggleReaction(id, user);
    }

    @GetMapping("/social")
    public Page<PostResponse> socialFeed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            org.springframework.security.core.Authentication authentication
    ) {

        User user = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            user = (User) authentication.getPrincipal();
        }

        return postService.getSocialFeed(page, size, user);
    }
}
