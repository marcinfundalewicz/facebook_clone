package com.example.facebookclone.domain.comment;

import com.example.facebookclone.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    long countByPost(Post post);
}
