package com.example.backend.services;

import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.dtos.UpdatePasswordRequest;
import com.example.backend.dtos.UpdateProfileRequest;
import com.example.backend.entities.Cart;
import com.example.backend.entities.User;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static final Integer ROLE_ADMIN = 1;
    public static final Integer ROLE_USER = 0;

    public AuthService(UserRepository userRepository, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    public String register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setRole(0);
        // Lưu user vào database trước
        user = userRepository.save(user);

        // Tạo giỏ hàng cho user mới
        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);
        return "User registered successfully!";
    }

    public String login(LoginRequest request, HttpServletRequest httpRequest) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                HttpSession session = httpRequest.getSession();
                session.setAttribute("user", user);
                session.setAttribute("UserId", user.getId());
                return "Login successful!";
            }
        }
        return "Invalid username or password!";
    }

    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "Logged out successfully!";
    }

    public String updateProfile(UpdateProfileRequest request, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return "User is not logged in!";
        }

        User user = (User) session.getAttribute("user");

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }
        if (request.getAddress() != null && !request.getAddress().isEmpty()) {
            user.setAddress(request.getAddress());
        }

        if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            user.setPhone(request.getPhone());
        }

        if (request.getFullName() != null && !request.getFullName().isEmpty()) {
            user.setFullName(request.getFullName());
        }

        userRepository.save(user);
        session.setAttribute("user", user);

        return "Profile updated successfully!";
    }

    public String updatePassword(UpdatePasswordRequest request, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return "User is not logged in!";
        }

        User user = (User) session.getAttribute("user");

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return "Incorrect old password!";
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Password updated successfully!";
    }

    public boolean hasRole(HttpServletRequest request, int requiredRole) {
        User user = getCurrentUser(request);
        return user != null && user.getRole() == requiredRole;
    }

    public boolean hasAnyRole(HttpServletRequest request, int... roles) {
        User user = getCurrentUser(request);
        if (user == null) return false;

        for (int role : roles) {
            if (user.getRole() == role) {
                return true;
            }
        }
        return false;
    }

    public User getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (User) session.getAttribute("user") : null;
    }

    public boolean isAdmin(HttpServletRequest request) {
        return hasRole(request, ROLE_ADMIN);
    }

    public boolean isRegularUser(HttpServletRequest request) {
        return hasRole(request, ROLE_USER);
    }
}
