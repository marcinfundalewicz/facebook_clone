package com.example.facebookclone.domain.friendship;
import com.example.facebookclone.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByRequesterAndAddressee(User requester, User addressee);
    List<Friendship> findByRequesterOrAddressee(User user1, User user2);
    boolean existsByRequesterAndReceiver(User requester, User receiver);
}
