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
public class PostControllerIT {

    @Autowired
    private MockMvc mockMvc;

    private String registerAndLogin(String email) throws Exception {
        String username = email.split("@")[0];
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
        String response = result.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        return jsonNode.get("token").asText();
    }

    @Test
    void shouldCreatePost() throws Exception {

        String token = registerAndLogin("post@test.pl");

        String postJson = """
                {
                "content": "Hello from test"
                }
                """;

        mockMvc.perform(post("/api/posts")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnPostInFeed() throws Exception {

        String token = registerAndLogin("feed@test.pl");

        String postJson = """
                {
                "content": "My first post"
                }
                """;

        mockMvc.perform(post("/api/posts")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postJson))
                        .andExpect(status().isOk());

        mockMvc.perform(get("/api/posts")
                        .header("Authorization", "Bearer " + token))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.content[0].content").value("My first post"));
    }
}
