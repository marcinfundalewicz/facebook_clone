package com.example.facebookclone.api.users;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public void getUser(@PathVariable Long id) {}

    @GetMapping("/me")
    public void me() {}

    @PutMapping("/me")
    public void updateMe() {}
}
