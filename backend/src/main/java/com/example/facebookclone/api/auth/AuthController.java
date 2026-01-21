package com.example.facebookclone.api.auth;

import com.example.facebookclone.api.auth.dto.LoginRequest;
import com.example.facebookclone.api.auth.dto.LoginResponse;
import com.example.facebookclone.api.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/logout")
    public void logout() {}

    @GetMapping("/me")
    public void me() {}
}
