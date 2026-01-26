package com.example.facebookclone.domain.reaction;

import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByPostAndUser(Post post, User user);

    long countByPost(Post post);

    boolean existsByPostAndUser(Post post, User user);
}
