package com.example.backend.service;

import com.example.backend.dto.CartDTO;
import com.example.backend.entity.Cart;
import com.example.backend.request.ChangeQuantityRequest;
import com.example.backend.request.RemoveFromCartRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    void addToCart(CartDTO cartDTO);
    List<CartDTO> getCartDetails(Integer userId);
    void changeQuantity(ChangeQuantityRequest request, int Quantity);
    void removeFromCart(RemoveFromCartRequest request);
}
