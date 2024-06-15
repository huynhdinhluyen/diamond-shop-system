package com.example.backend.service.impl;

import com.example.backend.dto.CartDTO;
import com.example.backend.entity.Cart;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.ChangeQuantityRequest;
import com.example.backend.request.RemoveFromCartRequest;
import com.example.backend.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(UserRepository userRepository, CartRepository cartRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void addToCart(CartDTO cartDTO) {
        User user = userRepository.findById(cartDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException(cartDTO.getUserId()));
        Product product = productRepository.findById(cartDTO.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(cartDTO.getProductId()));
        if (cartDTO.getSize() == null || cartDTO.getSize().isEmpty()) {
            throw new IllegalArgumentException("Size must be selected before adding to cart");
        }

        Cart existingCart = cartRepository.findByUserAndProductId(user, cartDTO.getProductId()).orElse(null);

        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + cartDTO.getQuantity());
            cartRepository.save(existingCart);
        } else {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(cartDTO.getQuantity());
            cart.setSize(cartDTO.getSize());
            cartRepository.save(cart);
        }
    }

    @Override
    public List<CartDTO> getCartDetails(Integer userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        return cartItems.stream().map(this::convertToCartDTO).collect(Collectors.toList());
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setProductId(cart.getProduct().getId());
        cartDTO.setQuantity(cart.getQuantity());
        cartDTO.setSize(cart.getSize());
        return cartDTO;
    }

    @Override
    public void changeQuantity(ChangeQuantityRequest request, int quantity) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(request.getProductId()));
        Cart cart = cartRepository.findByUserAndProductId(user, product.getId()).orElse(null);
        if(cart != null){
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        }
    }

    @Override
    public void removeFromCart(RemoveFromCartRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(request.getProductId()));
        Cart cart = cartRepository.findByUserAndProductId(user, product.getId()).orElse(null);
        if(cart != null){
            cartRepository.delete(cart);
        }
    }
}
