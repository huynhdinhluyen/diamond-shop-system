package com.example.backend.service.impl;

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import com.example.backend.exception.OrderNotFoundException;
import com.example.backend.exception.OrderStatusNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.*;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final OrderAssignmentRepository orderAssignmentRepository;
    private final OrderMapper orderMapper;
    private final TransactionRepository transactionRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final ProductRepository productRepository;
    private final MembershipLevelRepository membershipLevelRepository;

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
    public Map<String, Long> getMonthlySales(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startDateTime = startDate != null
                ? LocalDate.parse(startDate, formatter).atStartOfDay()
                : LocalDate.now().minusMonths(11).atStartOfDay();
        LocalDateTime endDateTime = endDate != null
                ? LocalDate.parse(endDate, formatter).plusDays(1).atStartOfDay() // Cộng 1 ngày để bao gồm cả endDate
                : LocalDate.now().plusDays(1).atStartOfDay();
        if (startDateTime.isAfter(endDateTime)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        List<Object[]> results = orderRepository.getMonthlySales(startDateTime, endDateTime);
        Map<String, Long> monthlySales = new LinkedHashMap<>(); // Sử dụng LinkedHashMap để giữ thứ tự
        for (Object[] result : results) {
            String monthYear = (String) result[0];
            Long totalSales = ((Number) result[1]).longValue();
            monthlySales.put(monthYear, totalSales);
        }
        // Điền các tháng còn thiếu bằng 0
        LocalDate startDateWithoutTime = startDateTime.toLocalDate();
        LocalDate endDateWithoutTime = endDateTime.toLocalDate().minusDays(1); // Trừ 1 ngày để loại trừ ngày hiện tại
        for (LocalDate date = startDateWithoutTime;
             date.isBefore(endDateWithoutTime);
             date = date.plusMonths(1)) {
            String monthYear = String.format("%02d/%d", date.getMonthValue(), date.getYear());
            monthlySales.putIfAbsent(monthYear, 0L);
        }
        return monthlySales;
    }

    @Override
    public Map<String, Long> getMonthlySalesOfSalesStaff(Integer staffId, String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startDateTime = startDate != null
                ? LocalDate.parse(startDate, formatter).atStartOfDay()
                : LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime endDateTime = endDate != null
                ? LocalDate.parse(endDate, formatter).plusDays(1).atStartOfDay() // Cộng 1 ngày để bao gồm cả endDate
                : LocalDate.now().plusDays(1).atStartOfDay();
        if (startDateTime.isAfter(endDateTime)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        List<Object[]> results = orderRepository.findMonthlySalesDataByStaff(staffId, startDateTime, endDateTime);
        Map<String, Long> monthlySales = new LinkedHashMap<>();
        for (Object[] result : results) {
            String monthYear = (String) result[0];
            Long totalSales = ((Number) result[1]).longValue();
            monthlySales.put(monthYear, totalSales);
        }
        LocalDate startDateWithoutTime = startDateTime.toLocalDate();
        LocalDate endDateWithoutTime = endDateTime.toLocalDate().minusDays(1);
        for (LocalDate date = startDateWithoutTime;
             date.isBefore(endDateWithoutTime);
             date = date.plusMonths(1)) {
            String monthYear = String.format("%02d/%d", date.getMonthValue(), date.getYear());
            monthlySales.putIfAbsent(monthYear, 0L);
        }
        return monthlySales;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getCategoryRevenue() {
        List<Object[]> results = orderDetailRepository.getCategoryRevenue();
        return new TreeMap<>(results.stream()
                .collect(Collectors.toMap(
                        result -> ((Category) result[0]).getName(),
                        result -> ((Long) result[1]),
                        (oldValue, newValue) -> oldValue
                )));
    }

    @Override
    @Transactional
    public OrderDTO addOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        // Set order properties
        order.setDeliveryFee(orderDTO.getDeliveryFee());
        order.setDiscountPrice(orderDTO.getDiscountPrice());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setCreatedAt(LocalDateTime.now());
        order.setCustomerName(orderDTO.getCustomerName());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        order.setNote(orderDTO.getNote());
        OrderStatus status = orderStatusRepository.findByName("PENDING")
                .orElseThrow(() -> new OrderStatusNotFoundException("PENDING"));
        order.setStatus(status);
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            Product product = productRepository.findById(detailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            if (product.getStockQuantity() < detailDTO.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }
            product.setStockQuantity(product.getStockQuantity() - detailDTO.getQuantity());
            productRepository.save(product);
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProductId(product.getId());
            orderDetail.setQuantity(detailDTO.getQuantity());
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());
            orderDetail.setSize(detailDTO.getSize());
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);
        // Save order first to generate an ID
        Order savedOrder = orderRepository.save(order);
        // Handle transaction
        if (orderDTO.getTransaction() != null) {
            TransactionDTO transactionDTO = orderDTO.getTransaction();
            Transaction transaction = new Transaction();
            transaction.setPaymentMethod(transactionDTO.getPaymentMethod());
            transaction.setTransactionDate(Instant.now());
            transaction.setTransactionAmount(transactionDTO.getTransactionAmount());
            transaction.setStatus(transactionDTO.getStatus()); // Use the status provided by frontend
            Transaction savedTransaction = transactionRepository.save(transaction);
            savedOrder.setTransaction(savedTransaction);
        }

        // Calculate and update points
        int pointsEarned = (int) (order.getTotalPrice() / 500000); //500.000 get 1 point
        updateUserMembershipLevel(user, pointsEarned);

        savedOrder = orderRepository.save(savedOrder);
        // sau khi add order thì phân công việc cho nhân viên bán hàng
        assignTaskToSalesStaff(savedOrder);
        return orderMapper.toOrderDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream().map(orderMapper::toOrderDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        return orderMapper.toOrderDTO(order);
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

    @Override
    public List<ProductSalesDTO> getProductSales() {
        List<Object[]> productSalesData = orderDetailRepository.getProductSales();
        return productSalesData.stream()
                .map(result -> {
                    Integer productId = (Integer) result[0];
                    String productName = (String) result[1];
                    String imageUrl = (String) result[2];
                    Long totalQuantity = ((Number) result[3]).longValue();
                    Long totalRevenue = ((Number) result[4]).longValue();
                    ProductDTO productDTO = new ProductDTO();
                    productDTO.setId(productId);
                    productDTO.setName(productName);
                    productDTO.setImageUrl(imageUrl);
                    return new ProductSalesDTO(productDTO, totalRevenue, totalQuantity);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderAssignment> getOrderByStaff(Integer staffId) {
        return orderAssignmentRepository.findOrderAssignmentsByStaff(staffId);
    }

    @Override
    public OrderAssignment confirmOrder(Integer orderId) {
        // set status order cho khách hàng thấy
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        OrderStatus orderStatus = orderStatusRepository.findByName("CONFIRMED")
                .orElseThrow(() -> new OrderStatusNotFoundException("CONFIRMED"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        // find và set trạng thái đơn hàng cho nhân viên có ít đơn hàng nhất
        OrderAssignment orderAssignment = orderAssignmentRepository.findByOrderIdAndSalesStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderStatus = orderStatusRepository.findByName("CONFIRMED")
                .orElseThrow(() -> new OrderStatusNotFoundException("CONFIRMED"));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        return orderAssignmentRepository.save(orderAssignment);
    }

    @Override
    public OrderAssignment assignOrderToDeliveryStaff(Integer orderId) {
        // set status order cho khách hàng thấy
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        OrderStatus orderStatus = orderStatusRepository.findByName("WAITING_FOR_PICKUP")
                .orElseThrow(() -> new OrderStatusNotFoundException("WAITING_FOR_PICKUP"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        //set status order cho nhân viên bán hàng
        OrderAssignment orderAssignment = orderAssignmentRepository.findByOrderIdAndSalesStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderStatus = orderStatusRepository.findByName("WAITING_FOR_PICKUP")
                .orElseThrow(() -> new OrderStatusNotFoundException("WAITING_FOR_PICKUP"));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        orderAssignmentRepository.save(orderAssignment);
        // find nhân viên giao hàng có ít đơn hàng có trạng thái shipping nhất và set trạng thái
        Integer staffId = orderAssignmentRepository.findDeliveryStaffWithLeastTasks();
        User staff = new User();
        if (staffId != null) {
            staff = userRepository.findById(staffId).orElseThrow(() -> new UserNotFoundException(staffId));
        } else {
            List<User> deliveryStaffs = userRepository.findByRole("DELIVERY_STAFF");
            if (!deliveryStaffs.isEmpty()) {
                Collections.shuffle(deliveryStaffs); // Xáo trộn danh sách
                staff = deliveryStaffs.getFirst(); // Lấy nhân viên đầu tiên (ngẫu nhiên)
            }
        }
        orderAssignment = new OrderAssignment();
        orderAssignment.setOrder(order);
        orderAssignment.setStaff(staff);
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        return orderAssignmentRepository.save(orderAssignment);
    }

    @Override
    public OrderAssignment pickUpOrder(Integer orderId) {
        // set status order cho khách hàng thấy
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        OrderStatus orderStatus = orderStatusRepository.findByName("SHIPPING")
                .orElseThrow(() -> new OrderStatusNotFoundException("SHIPPING"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        //set status order cho nhân viên bán hàng
        OrderAssignment orderAssignment = orderAssignmentRepository.findByOrderIdAndSalesStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        orderAssignmentRepository.save(orderAssignment);
        //set status order cho nhân viên giao hàng
        orderAssignment = orderAssignmentRepository.findByOrderIdAndDeliveryStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        return orderAssignmentRepository.save(orderAssignment);
    }

    @Override
    public OrderAssignment completeOrder(Integer orderId) {
        // set status order cho khách hàng thấy
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        OrderStatus orderStatus = orderStatusRepository.findByName("COMPLETED")
                .orElseThrow(() -> new OrderStatusNotFoundException("COMPLETED"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        //set status order cho nhân viên bán hàng
        OrderAssignment orderAssignment = orderAssignmentRepository.findByOrderIdAndSalesStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        orderAssignmentRepository.save(orderAssignment);
        //set status order cho nhân viên giao hàng
        orderAssignment = orderAssignmentRepository.findByOrderIdAndDeliveryStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        return orderAssignmentRepository.save(orderAssignment);
    }

    @Override
    public OrderAssignment cancelOrder(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        OrderStatus orderStatus = orderStatusRepository.findByName("CANCELLED")
                .orElseThrow(() -> new OrderStatusNotFoundException("CANCELLED"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        OrderAssignment orderAssignment = orderAssignmentRepository.findByOrderIdAndSalesStaff(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        orderAssignment.setOrderStatus(orderStatus);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        return orderAssignmentRepository.save(orderAssignment);
    }

    private void assignTaskToSalesStaff(Order order) {
        Integer result = orderAssignmentRepository.findSalesStaffWithLeastTasks();
        User staff = new User();
        if (result != null) {
            staff = userRepository.findById(result).orElseThrow(() -> new UserNotFoundException(result));
        } else {
            List<User> salesStaffs = userRepository.findByRole("SALES_STAFF");
            if (!salesStaffs.isEmpty()) {
                Collections.shuffle(salesStaffs); // Xáo trộn danh sách
                staff = salesStaffs.getFirst(); // Lấy nhân viên đầu tiên (ngẫu nhiên)
            }
        }
        OrderStatus status = orderStatusRepository.findByName("PENDING")
                .orElseThrow(() -> new OrderStatusNotFoundException("PENDING"));
        OrderAssignment orderAssignment = new OrderAssignment();
        orderAssignment.setOrder(order);
        orderAssignment.setStaff(staff);
        orderAssignment.setOrderStatus(status);
        orderAssignment.setUpdateAt(LocalDateTime.now());
        orderAssignmentRepository.save(orderAssignment);
    }

    private void updateUserMembershipLevel(User user, int newPoints) {
        int totalPoints = user.getPoints() + newPoints;

        MembershipLevel newMembershipLevel = membershipLevelRepository
                .findByMinPointsLessThanEqualAndMaxPointsGreaterThanEqual(totalPoints, totalPoints)
                .orElseThrow(() -> new RuntimeException("Membership level not found"));

        user.setPoints(totalPoints);
        user.setMembershipLevel(newMembershipLevel);
        userRepository.save(user);
    }
}