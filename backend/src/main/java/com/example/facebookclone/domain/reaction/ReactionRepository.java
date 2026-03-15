package com.example.facebookclone.domain.reaction;

import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByPost_IdAndUser_Id(Long postId, Long userId);

    long countByPost(Post post);

    boolean existsByPostAndUser(Post post, User user);
}
