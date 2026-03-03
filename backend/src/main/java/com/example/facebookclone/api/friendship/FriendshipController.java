package com.example.facebookclone.api.friendship;

import com.example.facebookclone.domain.user.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendshipController {
    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @PostMapping("/{userId}")
    public void sendRequest(
            @PathVariable Long userId,
            org.springframework.security.core.Authentication authentication
    ) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new RuntimeException("Login required");
        }

        friendshipService.sendRequest(userId, user);
    }

    @PostMapping("/{id}/accept")
    public void accept(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        friendshipService.acceptRequest(id, user);
    }

    @GetMapping
    public List<User> listFriends(org.springframework.security.core.Authentication authentication) {

        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new RuntimeException("Login required");
        }

        return friendshipService.getFriends(user);
    }
}
