package com.example.facebookclone.api.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public void register() {}

    @PostMapping("/login")
    public void login() {}

    @PostMapping("/logout")
    public void logout() {}

    @GetMapping("/me")
    public void me() {}
}
