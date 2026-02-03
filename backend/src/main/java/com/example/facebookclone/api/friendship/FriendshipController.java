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
            @AuthenticationPrincipal User user
    ) {
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
    public List<User> listFriends(@AuthenticationPrincipal User user) {
        return friendshipService.getFriends(user);
    }
}
