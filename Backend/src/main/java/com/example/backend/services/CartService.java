package com.example.backend.services;

import com.example.backend.dtos.CartDTO;
import com.example.backend.dtos.CartItemDTO;
import com.example.backend.dtos.CartItemRequest;
import com.example.backend.entities.Cart;
import com.example.backend.entities.CartItem;
import com.example.backend.entities.Product;
import com.example.backend.entities.User;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.CartItemRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public String addProductToCart(Integer userId, CartItemRequest cartItemRequest) {
        // Tìm user
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Tìm sản phẩm
        Product product = productRepository.findById(cartItemRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Tìm giỏ hàng của user (hoặc tạo mới nếu chưa có)
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (existingCartItem.isPresent()) {
            // Nếu đã có thì cộng dồn số lượng
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
            cartItemRepository.save(cartItem);
            return "Product quantity updated in cart!";
        } else {
            // Nếu chưa có thì tạo mới
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setQuantity(cartItemRequest.getQuantity());
            newCartItem.setCart(cart);
            cartItemRepository.save(newCartItem);
            return "Product added to cart successfully!";
        }
    }

    public CartDTO getCartByUserId(Integer userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart == null) {
            return null;
        }

        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream()
                .map(cartItem -> {
                    Product product = cartItem.getProduct();

                    // Kiểm tra danh sách ảnh để tránh lỗi NullPointerException
                    String imageUrl = (product.getImages() != null && !product.getImages().isEmpty())
                            ? product.getImages().get(0).getImageUrl() // Chỉ lấy ảnh đầu tiên
                            : null;

                    return new CartItemDTO(
                            cartItem.getId(),
                            product.getId(),
                            product.getName(),
                            product.getPrice(),
                            cartItem.getQuantity(),
                            imageUrl
                    );
                })
                .collect(Collectors.toList());

        return new CartDTO(cart.getId(), cart.getUser().getId(), cartItemDTOs);
    }

    @Transactional
    public String updateProductQuantityInCart(Integer userId, CartItemRequest cartItemRequest) {
        // Tìm user
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Tìm sản phẩm
        Product product = productRepository.findById(cartItemRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Tìm giỏ hàng của user (hoặc tạo mới nếu chưa có)
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (existingCartItem.isPresent()) {
            // Nếu đã có thì cập nhật số lượng sản phẩm
            CartItem cartItem = existingCartItem.get();

            int updatedQuantity = cartItem.getQuantity() + cartItemRequest.getQuantity();

            // Kiểm tra nếu số lượng không hợp lệ (ví dụ như < 0)
            if (updatedQuantity < 0) {
                return "Cannot reduce quantity below 0.";
            }

            cartItem.setQuantity(updatedQuantity);
            cartItemRepository.save(cartItem);
            return "Product quantity updated in cart!";
        } else {
            // Nếu chưa có thì tạo mới (thêm sản phẩm vào giỏ hàng)
            if (cartItemRequest.getQuantity() < 0) {
                return "Quantity cannot be less than 1 when adding to cart.";
            }

            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setQuantity(cartItemRequest.getQuantity());
            newCartItem.setCart(cart);
            cartItemRepository.save(newCartItem);
            return "Product added to cart successfully!";
        }
    }

    public boolean removeProductFromCart(Integer userId, Integer cartItemId) {
        // Tìm giỏ hàng của người dùng
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart == null) {
            return false;
        }

        // Tìm sản phẩm trong giỏ hàng
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
        if (cartItem == null || !cartItem.getCart().equals(cart)) {
            return false;
        }

        // Xóa sản phẩm khỏi giỏ hàng
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return true;
    }
}
