package com.example.facebookclone.domain.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Post> findByAuthor_IdIn(List<Long> authorIds, Pageable pageable);
    Page<Post> findByAuthorUsername(String username, Pageable pageable);
}
