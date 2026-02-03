package com.example.facebookclone.api.posts;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PostFeedIT {
    @Autowired
    private MockMvc mockMvc;

    private String registerAndLogin(String email, String username) throws Exception {
        String registerJson = """
                {
                            "email": "%s",
                            "username": "%s",
                            "password": "password"
                }
                """.formatted(email, username);
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(status().isOk());

        String loginJson = """
                    {
                        "email": "%s",
                        "password": "password"
                    }
                """.formatted(email);

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                        .andExpect(status().isOk())
                        .andReturn();

        JsonNode json = new ObjectMapper()
                .readTree(result.getResponse().getContentAsString());

        return json.get("token").asText();
    }

    @Test
    void shouldSeeOwnPostInFeed() throws Exception {
        String token = registerAndLogin("a@test.pl", "userA");

        String postJson = """
        { "content": "my post" }
    """;

        mockMvc.perform(post("/api/posts")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postJson))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/posts/social")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].content").value("my post"));
    }
    @Test
    void shouldSeeFriendsPost() throws Exception {
        String tokenA = registerAndLogin("a@test.pl", "userA");
        String tokenB = registerAndLogin("b@test.pl", "userB");

        mockMvc.perform(post("/api/friendships/2")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/friendships/1/accept")
                        .header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/posts")
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"content\":\"friend post\"}"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/posts/social")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].content").value("friend post"));
    }
    @Test
    void shouldNotSeeStrangersPost() throws Exception {
        String tokenA = registerAndLogin("a@test.pl", "userA");
        String tokenB = registerAndLogin("b@test.pl", "userB");

        mockMvc.perform(post("/api/posts")
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"content\":\"secret\"}"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/posts/social")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isEmpty());
    }
}
