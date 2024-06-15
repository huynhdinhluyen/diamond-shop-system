package com.example.backend.service.impl;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.OrderDetailDTO;
import com.example.backend.dto.OrderStatusDTO;
import com.example.backend.dto.TransactionDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import com.example.backend.repository.*;
import com.example.backend.entity.*;
import com.example.backend.repository.OrderDetailRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public Long getTotalOrders() {
        return orderRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalRevenue() {
        return orderRepository.getTotalRevenue();
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getMonthlySales() {
        LocalDate currentDate = LocalDate.now();
        LocalDateTime startDateTime = currentDate.minusMonths(11).atStartOfDay();
        LocalDateTime endDateTime = currentDate.plusDays(1).atStartOfDay();
        List<Object[]> results = orderRepository.getMonthlySales(startDateTime, endDateTime);
        Map<String, Long> monthlySales = results.stream()
                .collect(Collectors.toMap(
                        result -> (String) result[0],
                        result -> ((Number) result[1]).longValue(),
                        (oldValue, newValue) -> oldValue,
                        LinkedHashMap::new
                ));
        // Điền các tháng còn thiếu bằng 0 (trừ tháng hiện tại)
        LocalDate endDateWithoutTime = endDateTime.toLocalDate().minusDays(1); // Trừ 1 ngày để loại trừ ngày hiện tại
        for (LocalDate date = startDateTime.toLocalDate(); date.isBefore(endDateWithoutTime); date = date.plusMonths(1)) {
            String monthYear = String.format("%02d/%d", date.getMonthValue(), date.getYear());
            monthlySales.putIfAbsent(monthYear, 0L);
        }
        return monthlySales;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getCategoryRevenue() {
        List<Object[]> results = orderDetailRepository.getCategoryRevenue();
        Map<String, Long> categoryRevenue = new TreeMap<>(results.stream()
                .collect(Collectors.toMap(
                        result -> ((Category) result[0]).getName(),
                        result -> ((Long) result[1]),
                        (oldValue, newValue) -> oldValue
                )));
        return categoryRevenue;
    }

    @Override
    public OrderDTO addOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = new Order();
        order.setUser(user);
        order.setTransaction(null);
        order.setDeliveryFee(orderDTO.getDeliveryFee());
        order.setDiscountPrice(orderDTO.getDiscountPrice());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setCreatedAt(LocalDateTime.now());
        order.setCustomerName(orderDTO.getCustomerName());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        order.setNote(orderDTO.getNote());

        OrderStatus status = orderStatusRepository.findById(1) // Giả sử 1 là trạng thái "Mới"
                .orElseThrow(() -> new RuntimeException("Order status not found"));
        order.setStatus(status);

        List<OrderDetail> orderDetails = new ArrayList<>();


        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            Product product = productRepository.findById(detailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProductId(product.getId());
            orderDetail.setQuantity(detailDTO.getQuantity());
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());
            orderDetail.setSize(detailDTO.getSize());
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);

        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDto(order);
    }

    @Override
    @Transactional
    public void updateTransactionId(Integer orderId, Integer transactionId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction method not found"));

        order.setTransaction(transaction);
        orderRepository.save(order);
    }

    @Override
    public void updateOrderNote(Integer orderId, String note) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setNote(note);
        orderRepository.save(order);
    }

    private OrderDTO convertToDto(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setUserId(order.getUser().getId());
        orderDTO.setTransaction(convertToTransactionDTO(order.getTransaction()));
        orderDTO.setDeliveryFee(order.getDeliveryFee());
        orderDTO.setDiscountPrice(order.getDiscountPrice());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setCustomerName(order.getCustomerName());
        orderDTO.setShippingAddress(order.getShippingAddress());
        orderDTO.setPhoneNumber(order.getPhoneNumber());
        orderDTO.setNote(order.getNote());
        orderDTO.setStatus(convertOrderStatusToDTO(order.getStatus()));
        List<OrderDetailDTO> orderDetailDTOs = order.getOrderDetails().stream().
                map(this::convertToDto).collect(Collectors.toList());
        orderDTO.setOrderDetails(orderDetailDTOs);
        return orderDTO;
    }

    private OrderDetailDTO convertToDto(OrderDetail orderDetail) {
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setProductId(orderDetail.getProductId());
        orderDetailDTO.setQuantity(orderDetail.getQuantity());
        orderDetailDTO.setUnitPrice(orderDetail.getUnitPrice());
        orderDetailDTO.setSize(orderDetail.getSize());
        return orderDetailDTO;
    }

    private TransactionDTO convertToTransactionDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setId(transaction.getId());
        transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
        transactionDTO.setTransactionDate(transaction.getTransactionDate());
        transactionDTO.setTransactionAmount(transaction.getTransactionAmount());
        transactionDTO.setStatus(transaction.getStatus());
        return transactionDTO;
    }

    private OrderStatusDTO convertOrderStatusToDTO(OrderStatus status) {
        if (status == null) {
            return null;
        }
        OrderStatusDTO statusDTO = new OrderStatusDTO();
        statusDTO.setId(status.getId());
        statusDTO.setName(status.getName());
        return statusDTO;
    }
}