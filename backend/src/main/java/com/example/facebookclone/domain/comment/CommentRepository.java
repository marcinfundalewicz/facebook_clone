package com.example.facebookclone.domain.comment;

import com.example.facebookclone.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    long countByPost(Post post);
    List<Comment> findByPostIdOrderByCreatedAtAsc(Long postId);
}
