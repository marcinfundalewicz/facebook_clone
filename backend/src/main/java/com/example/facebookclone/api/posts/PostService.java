package com.example.facebookclone.api.posts;

import com.example.facebookclone.api.posts.dto.PostCreateRequest;
import com.example.facebookclone.api.posts.dto.PostResponse;
import com.example.facebookclone.api.reactions.ReactionService;
import com.example.facebookclone.domain.comment.CommentRepository;
import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.post.PostRepository;
import com.example.facebookclone.domain.reaction.ReactionRepository;
import com.example.facebookclone.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, ReactionRepository reactionRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.reactionRepository = reactionRepository;
        this.commentRepository = commentRepository;
    }

    public void create(PostCreateRequest request, User author) {
        Post post = new Post();
        post.setContent(request.getContent());
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    public Page<PostResponse> getFeed(int page, int size, User user) {
        PageRequest pegable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return postRepository.findAll(pegable)
                .map(post -> {
                    long likesCount = reactionRepository.countByPost(post);
                    long commentsCount = commentRepository.countByPost(post);
                    boolean likedByMe = reactionRepository.existByPostAndUser(post, user);
                    return new PostResponse(
                            post.getId(),
                            post.getContent(),
                            post.getAuthor().getUsername(),
                            post.getCreatedAt(),
                            likesCount,
                            commentsCount,
                            likedByMe
                    );
                });
    }
}
