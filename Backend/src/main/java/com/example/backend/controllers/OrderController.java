package com.example.backend.controllers;

import com.example.backend.dtos.OrderDTO;
import com.example.backend.dtos.OrderItemDTO;
import com.example.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Phương thức tạo đơn hàng
    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(HttpServletRequest request, @RequestBody List<OrderItemDTO> items) {
        Integer userId = (Integer) request.getSession().getAttribute("UserId");

        // Kiểm tra nếu không có session
        if (userId == null) {
            return ResponseEntity.status(400).body(null);
        }

        OrderDTO order = orderService.createOrder(userId, items);

        // Kiểm tra nếu không thể tạo đơn hàng
        if (order == null) {
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.ok(order);
    }

    // Phương thức lấy thông tin đơn hàng theo ID
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Integer orderId) {
        // Lấy thông tin đơn hàng
        OrderDTO order = orderService.getOrderById(orderId);

        // Kiểm tra nếu không tìm thấy đơn hàng
        if (order == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(order);
    }

    // Phương thức lấy danh sách đơn hàng của người dùng theo userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Integer userId) {
        // Lấy danh sách đơn hàng của người dùng
        List<OrderDTO> orders = orderService.getOrdersByUserId(userId);

        // Nếu không có đơn hàng nào, trả về danh sách trống
        if (orders == null || orders.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(orders);
    }

    // Cập nhật trạng thái đơn hàng
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Integer orderId, @RequestParam String status) {
        OrderDTO updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

    // Cập nhật trạng thái thanh toán
    @PutMapping("/{orderId}/payment-status")
    public ResponseEntity<OrderDTO> updatePaymentStatus(@PathVariable Integer orderId, @RequestParam String paymentStatus) {
        OrderDTO updatedOrder = orderService.updatePaymentStatus(orderId, paymentStatus);
        return ResponseEntity.ok(updatedOrder);
    }

    // Cập nhật trạng thái vận chuyển
    @PutMapping("/{orderId}/shipping-status")
    public ResponseEntity<OrderDTO> updateShippingStatus(@PathVariable Integer orderId, @RequestParam String shippingStatus) {
        OrderDTO updatedOrder = orderService.updateShippingStatus(orderId, shippingStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}