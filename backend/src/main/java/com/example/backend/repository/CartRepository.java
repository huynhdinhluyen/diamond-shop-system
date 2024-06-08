package com.example.backend.repository;


import com.example.backend.entity.Cart;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUserAndProductId(User user, Integer productId);
    List<Cart> findByUserId(Integer userId);
}
