package com.example.backend.service.impl;

import com.example.backend.dto.CartDTO;
import com.example.backend.entity.Cart;
import com.example.backend.request.ChangeQuantityRequest;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.RemoveFromCartRequest;
import com.example.backend.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        User user = userRepository.findById(cartDTO.getUser_id())
                .orElseThrow(() -> new UserNotFoundException(cartDTO.getUser_id()));
        Product product = productRepository.findById(cartDTO.getProduct_id())
                .orElseThrow(() -> new ProductNotFoundException(cartDTO.getProduct_id()));
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
        Cart existingCart = cartRepository.findByUserAndProductId(user, cartDTO.getProduct_id()).orElse(null);

        if (existingCart != null) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
            existingCart.setQuantity(existingCart.getQuantity() + cartDTO.getQuantity());
            cartRepository.save(existingCart);
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới bản ghi
            Cart cart = new Cart(cartDTO.getId(), user, cartDTO.getProduct_id(), cartDTO.getQuantity());
            cartRepository.save(cart);
        }
//        cartRepository.save(CartMapper.maptoCartEntity(cartDTO));
    }

    @Override
    public List<Cart> getCartDetails(Integer userId) {
        return cartRepository.findByUserId(userId);
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
