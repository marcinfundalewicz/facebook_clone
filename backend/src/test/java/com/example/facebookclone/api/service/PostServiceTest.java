package com.example.facebookclone.api.service;

import com.example.facebookclone.api.posts.PostService;
import com.example.facebookclone.api.posts.dto.PostCreateRequest;
import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.post.PostRepository;
import com.example.facebookclone.domain.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    @Test
    void shouldCreatePost() {
        // given
        PostCreateRequest request = new PostCreateRequest();
        request.setContent("Test post");
        request.setImageUrl("img.jpg");

        User user = new User();
        user.setId(1L);
        user.setUsername("john");

        // when
        postService.create(request, user);

        // then
        verify(postRepository).save(any(Post.class));
    }
}