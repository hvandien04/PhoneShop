package com.example.backend.dtos;

import java.util.List;

public class CartDTO {
    private Integer id;
    private Integer userId;
    private List<CartItemDTO> cartItems;

    public CartDTO(Integer id, Integer userId, List<CartItemDTO> cartItems) {
        this.id = id;
        this.userId = userId;
        this.cartItems = cartItems;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<CartItemDTO> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDTO> cartItems) {
        this.cartItems = cartItems;
    }
} 