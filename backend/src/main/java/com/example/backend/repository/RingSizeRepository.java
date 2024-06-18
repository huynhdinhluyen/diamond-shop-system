package com.example.backend.repository;

import com.example.backend.entity.RingSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RingSizeRepository extends JpaRepository<RingSize, Integer> {
    List<RingSize> findByCategoryId(Integer categoryId);
}
