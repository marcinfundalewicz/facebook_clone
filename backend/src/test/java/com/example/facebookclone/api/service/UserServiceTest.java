package com.example.facebookclone.api.service;

import com.example.facebookclone.api.users.UserService;
import com.example.facebookclone.api.users.dto.UserResponse;
import com.example.facebookclone.domain.user.User;
import com.example.facebookclone.domain.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnAllUsersExceptCurrentUser() {
        // given
        User currentUser = new User();
        currentUser.setId(1L);
        currentUser.setUsername("current");

        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("current");

        User user2 = new User();
        user2.setId(2L);
        user2.setUsername("john");

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        // when
        List<UserResponse> result = userService.listUsers(currentUser);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).username()).isEqualTo("john");
    }
}