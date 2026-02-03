package com.example.facebookclone.api.friendship;

import com.example.facebookclone.domain.user.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            @AuthenticationPrincipal User user
            ) {
        friendshipService.sendRequest(userId, user);
    }
}
