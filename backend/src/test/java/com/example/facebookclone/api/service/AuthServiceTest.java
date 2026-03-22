package com.example.facebookclone.api.service;

import com.example.facebookclone.api.auth.AuthService;
import com.example.facebookclone.api.auth.JwtService;
import com.example.facebookclone.api.auth.dto.RegisterRequest;
import com.example.facebookclone.domain.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterUserWithEncodedPassword() {
        // given
        RegisterRequest request = new RegisterRequest();
        request.setEmail("email@test.com");
        request.setUsername("john");
        request.setPassword("password");

        when(userRepository.existsByEmail("email@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encoded");

        // when
        authService.register(request);

        // then
        verify(userRepository).save(argThat(user ->
                user.getEmail().equals("email@test.com") &&
                        user.getUsername().equals("john") &&
                        user.getPassword().equals("encoded")
        ));
    }
}