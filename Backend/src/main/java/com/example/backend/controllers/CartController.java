package com.example.backend.controllers;

import com.example.backend.dtos.CartDTO;
import com.example.backend.dtos.CartItemRequest;
import com.example.backend.services.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @GetMapping("/get")
    public ResponseEntity<CartDTO> getCart(HttpServletRequest request) {
        Integer userId = (Integer) request.getSession().getAttribute("UserId");

        if (userId == null) {
            return ResponseEntity.status(400).body(null);
        }

        CartDTO cart = cartService.getCartByUserId(userId);
        if (cart == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProductToCart(@RequestBody CartItemRequest cartItemRequest, HttpServletRequest request) {
        // Lấy userId từ session
        Integer userId = (Integer) request.getSession().getAttribute("UserId");

        // Kiểm tra nếu không có session
        if (userId == null) {
            return ResponseEntity.status(400).body("User is not logged in.");
        }

        // Thêm sản phẩm vào giỏ hàng
        String response = cartService.addProductToCart(userId, cartItemRequest);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable Integer cartItemId, HttpServletRequest request) {
        // Lấy userId từ session
        Integer userId = (Integer) request.getSession().getAttribute("UserId");

        // Kiểm tra nếu không có session
        if (userId == null) {
            return ResponseEntity.status(400).body("User is not logged in.");
        }

        // Gọi service để xóa sản phẩm khỏi giỏ hàng
        boolean removed = cartService.removeProductFromCart(userId, cartItemId);
        if (removed) {
            return ResponseEntity.ok("Product removed from cart.");
        } else {
            return ResponseEntity.status(404).body("Product not found in cart.");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateProductQuantityInCart(@RequestBody CartItemRequest cartItemRequest, HttpServletRequest request) {
        // Lấy userId từ session
        Integer userId = (Integer) request.getSession().getAttribute("UserId");

        // Kiểm tra nếu không có session
        if (userId == null) {
            return ResponseEntity.status(400).body("User is not logged in.");
        }

        // Gọi service để cập nhật số lượng sản phẩm
        String response = cartService.updateProductQuantityInCart(userId, cartItemRequest);
        return ResponseEntity.ok(response);
    }

}
