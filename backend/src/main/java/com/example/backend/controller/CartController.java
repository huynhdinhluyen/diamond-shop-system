package com.example.backend.controller;

import com.example.backend.dto.CartDTO;
import com.example.backend.entity.Cart;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.request.ChangeQuantityRequest;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.RemoveFromCartRequest;
import com.example.backend.service.CartService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartDTO cartDTO) {
        cartService.addToCart(cartDTO);
        return ResponseEntity.ok("Đã thêm vào giỏ hàng");
    }

    @GetMapping("/details")
    public ResponseEntity<List<CartDTO>> getCartByUser(@RequestParam Integer userId) {
        List<CartDTO> cartDetails = cartService.getCartDetails(userId);
        return ResponseEntity.ok(cartDetails);
    }

    @PutMapping("/change-quantity")
    public ResponseEntity<?> changeQuantity(@RequestBody ChangeQuantityRequest request) {
        try {
            cartService.changeQuantity(request, request.getQuantity());
            return ResponseEntity.ok("Đã thay đổi số lượng sản phẩm");
        } catch (UserNotFoundException | ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating quantity");
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody RemoveFromCartRequest request) {
        try {
            cartService.removeFromCart(request);
            return ResponseEntity.ok("Đã xóa sản phẩm!");
        } catch (UserNotFoundException | ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing item from cart");
        }
    }

}
