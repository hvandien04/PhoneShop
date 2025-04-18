package com.example.backend.controllers;

import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.dtos.UpdatePasswordRequest;
import com.example.backend.dtos.UpdateProfileRequest;
import com.example.backend.entities.User;
import com.example.backend.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.login(request, httpRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        return ResponseEntity.ok(authService.logout(request));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.updateProfile(request, httpRequest));
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.updatePassword(request, httpRequest));
    }


    @GetMapping("/session")
    public ResponseEntity<Map<String, Object>> getSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Map<String, Object> response = new HashMap<>();

        // Kiểm tra nếu session tồn tại và có thuộc tính "user"
        if (session != null && session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");

            // Trả về thông báo và đối tượng người dùng trong Map
            response.put("message", "User is logged in!");
            response.put("user", user);
        } else {
            response.put("message", "No active session found!");
            response.put("user", null);
        }

        return ResponseEntity.ok(response);
    }
}
