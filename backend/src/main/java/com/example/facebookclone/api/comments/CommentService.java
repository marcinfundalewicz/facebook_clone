package com.example.facebookclone.api.comments;

import com.example.facebookclone.api.comments.dto.CommentCreateRequest;
import com.example.facebookclone.domain.comment.Comment;
import com.example.facebookclone.domain.comment.CommentRepository;
import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.post.PostRepository;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.exception.ForbiddenException;
import com.example.facebookclone.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public void addComment(Long postId, CommentCreateRequest request, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found"));
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setAuthor(user);
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));
        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new ForbiddenException("You cannot delete this comment");
        }
        commentRepository.save(comment);
    }
}
