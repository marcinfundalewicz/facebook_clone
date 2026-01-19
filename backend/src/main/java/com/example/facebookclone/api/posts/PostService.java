package com.example.facebookclone.api.posts;

import com.example.facebookclone.api.posts.dto.PostCreateRequest;
import com.example.facebookclone.api.posts.dto.PostResponse;
import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.post.PostRepository;
import com.example.facebookclone.domain.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public void create(PostCreateRequest request, User author) {
        Post post = new Post();
        post.setContent(request.getContent());
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    public List<PostResponse> getFeed() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(post -> new PostResponse(
                        post.getId(),
                        post.getContent(),
                        post.getAuthor().getUsername(),
                        post.getCreatedAt()
                ))
                .toList();
    }
}
