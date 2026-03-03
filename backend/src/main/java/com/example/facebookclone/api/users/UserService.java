package com.example.facebookclone.api.users;

import com.example.facebookclone.api.users.dto.UserResponse;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.domain.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> listUsers(User currentUser) {
        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername()
                ))
                .toList();
    }
}