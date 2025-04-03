package com.example.backend.services;

import com.example.backend.dtos.OrderDTO;
import com.example.backend.dtos.OrderItemDTO;
import com.example.backend.entities.*;
import com.example.backend.repositories.OrderItemRepository;
import com.example.backend.repositories.OrderRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderDTO createOrder(Integer userId, List<OrderItemDTO> itemDTOs) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Tính tổng tiền
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemDTO itemDTO : itemDTOs) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
        }

        // Tạo Order
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(Instant.now());
        order.setTotalAmount(totalAmount);
        order.setStatus("Pending");
        order.setPaymentStatus("Unpaid");
        order.setShippingStatus("Processing");
        order = orderRepository.save(order);

        // Lưu OrderItems
        for (OrderItemDTO itemDTO : itemDTOs) {
            Product product = productRepository.findById(itemDTO.getProductId()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItemRepository.save(orderItem);
        }

        return convertToDTO(order);
    }

    public OrderDTO getOrderById(Integer orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }

    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO updateOrderStatus(Integer orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
        return convertToDTO(order);
    }

    @Transactional
    public OrderDTO updatePaymentStatus(Integer orderId, String paymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setPaymentStatus(paymentStatus);
        orderRepository.save(order);
        return convertToDTO(order);
    }

    @Transactional
    public OrderDTO updateShippingStatus(Integer orderId, String shippingStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setShippingStatus(shippingStatus);
        orderRepository.save(order);
        return convertToDTO(order);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setShippingStatus(order.getShippingStatus());

        List<OrderItemDTO> itemDTOs = orderItemRepository.findByOrderId(order.getId()).stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setName(item.getProduct().getName());

            List<ProductImage> images = item.getProduct().getImages();
            List<String> imageUrls = (images != null) ? images.stream()
                    .map(ProductImage::getImageUrl)
                    .toList() : List.of();

            itemDTO.setImageUrl(imageUrls.isEmpty() ? null : imageUrls.get(0));

            return itemDTO;
        }).collect(Collectors.toList());

        dto.setItems(itemDTOs);
        return dto;
    }

}
