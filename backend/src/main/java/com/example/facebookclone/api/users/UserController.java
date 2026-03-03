package com.example.facebookclone.api.users;

import com.example.facebookclone.api.users.dto.UserResponse;
import com.example.facebookclone.domain.user.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public void getUser(@PathVariable Long id) {
    }

    @GetMapping("/me")
    public void me() {
    }

    @PutMapping("/me")
    public void updateMe() {
    }

    @GetMapping
    public List<UserResponse> listUsers(
            @AuthenticationPrincipal User currentUser
    ) {
        return userService.listUsers(currentUser);
    }
}
