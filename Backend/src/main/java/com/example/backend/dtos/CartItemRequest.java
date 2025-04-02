package com.example.backend.dtos;

@lombok.Getter
@lombok.Setter
public class CartItemRequest {
    private Integer productId;
    private Integer quantity;
}
