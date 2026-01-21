package com.example.facebookclone.api.reactions;

import com.example.facebookclone.domain.post.Post;
import com.example.facebookclone.domain.post.PostRepository;
import com.example.facebookclone.domain.reaction.Reaction;
import com.example.facebookclone.domain.reaction.ReactionRepository;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    public ReactionService(ReactionRepository reactionRepository, PostRepository postRepository) {
        this.reactionRepository = reactionRepository;
        this.postRepository = postRepository;
    }

    public void toggleReaction(Long postId, User user) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        reactionRepository.findByPostAndUser(post, user)
                .ifPresentOrElse(
                        reactionRepository::delete,
                        () -> {
                            Reaction reaction = new Reaction();
                            reaction.setPost(post);
                            reaction.setUser(user);
                            reaction.setType("LIKE");
                            reaction.setCreatedAt(LocalDateTime.now());
                            reactionRepository.save(reaction);
                        }
                );
    }
}
