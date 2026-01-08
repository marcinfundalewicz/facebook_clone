package com.example.facebookclone.api.posts;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @GetMapping
    public void getFeed() {}

    @PostMapping
    public void createPost() {}

    @GetMapping("/{id}")
    public void getPost(@PathVariable Long id) {}

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {}

    @PostMapping("/{id}/reactions")
    public void react(@PathVariable Long id) {}

    @PostMapping("/{id}/comments")
    public void comment(@PathVariable Long id) {}
}
