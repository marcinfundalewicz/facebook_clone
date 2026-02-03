package com.example.facebookclone.api.friendship;

import com.example.facebookclone.domain.friendship.Friendship;
import com.example.facebookclone.domain.friendship.FriendshipRepository;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.domain.user.UserRepository;
import com.example.facebookclone.exception.BadRequestException;
import com.example.facebookclone.exception.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FriendshipService {
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;

    public FriendshipService(UserRepository userRepository, FriendshipRepository friendshipRepository) {
        this.userRepository = userRepository;
        this.friendshipRepository = friendshipRepository;
    }

    public void sendRequest(Long targetUserid, User currentUser) {

        if (currentUser.getId().equals(targetUserid)) {
            throw new BadRequestException("Cannot add yourself");
        }

        User target = userRepository.findById(targetUserid)
                .orElseThrow(() -> new NotFoundException("User not found"));

        boolean exists = friendshipRepository.existsByRequesterAndReceiver(currentUser, target);

        if (exists) {
            throw new BadRequestException("Request already exists");
        }

        Friendship friendship = new Friendship(currentUser, target);

        friendshipRepository.save(friendship);
    }

    public void acceptRequest(Long friendshipId, User currentUser) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new NotFoundException("Request not found"));

        if(!friendship.getAddressee().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Not your request");
        }
            friendship.accept();

            friendshipRepository.save(friendship);
    }
}
