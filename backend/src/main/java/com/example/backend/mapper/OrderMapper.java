package com.example.backend.mapper;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.OrderDetailDTO;
import com.example.backend.dto.OrderStatusDTO;
import com.example.backend.dto.TransactionDTO;
import com.example.backend.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final OrderDetailMapper orderDetailMapper;
    private final OrderStatusMapper orderStatusMapper;
    private final TransactionMapper transactionMapper;

    public OrderDTO toOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setUserId(order.getUser().getId());

        // Set transaction information
        if (order.getTransaction() != null) {
            TransactionDTO transactionDTO = new TransactionDTO();
            transactionDTO.setId(order.getTransaction().getId());
            transactionDTO.setPaymentMethod(order.getTransaction().getPaymentMethod());
            transactionDTO.setTransactionDate(order.getTransaction().getTransactionDate());
            transactionDTO.setTransactionAmount(order.getTransaction().getTransactionAmount());
            transactionDTO.setStatus(order.getTransaction().getStatus());
            orderDTO.setTransaction(transactionDTO);
        }

        orderDTO.setDeliveryFee(order.getDeliveryFee());
        orderDTO.setDiscountPrice(order.getDiscountPrice());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setCustomerName(order.getCustomerName());
        orderDTO.setShippingAddress(order.getShippingAddress());
        orderDTO.setPhoneNumber(order.getPhoneNumber());
        orderDTO.setNote(order.getNote());
        orderDTO.setCancelOrder(order.getCancelReason());
        // Set order status information
        OrderStatusDTO statusDTO = new OrderStatusDTO();
        statusDTO.setId(order.getStatus().getId());
        statusDTO.setName(order.getStatus().getName());
        orderDTO.setStatus(statusDTO);

        // Convert order details to DTOs
        List<OrderDetailDTO> orderDetailDTOs = order.getOrderDetails().stream()
                .map(detail -> {
                    OrderDetailDTO detailDTO = new OrderDetailDTO();
                    detailDTO.setProductId(detail.getProductId());
                    detailDTO.setQuantity(detail.getQuantity());
                    detailDTO.setUnitPrice(detail.getUnitPrice());
                    detailDTO.setSize(detail.getSize());
                    return detailDTO;
                })
                .collect(Collectors.toList());

        orderDTO.setOrderDetails(orderDetailDTOs);

        return orderDTO;
    }
}
