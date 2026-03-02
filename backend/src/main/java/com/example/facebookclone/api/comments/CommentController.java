package com.example.facebookclone.api.comments;

import com.example.facebookclone.api.comments.dto.CommentCreateRequest;
import com.example.facebookclone.api.comments.dto.CommentResponse;
import com.example.facebookclone.domain.user.User;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/posts/{postId}/comments")
    public void addComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentCreateRequest request,
            org.springframework.security.core.Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        commentService.addComment(postId, request, user);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(
            @PathVariable Long commentId,
            org.springframework.security.core.Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        commentService.deleteComment(commentId, user);
    }

    @GetMapping("/posts/{postId}/comments")
    public List<CommentResponse> getComments(@PathVariable Long postId) {
        return commentService.getCommentsForPost(postId);
    }
}
