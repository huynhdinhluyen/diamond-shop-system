package com.example.backend.repository;

import com.example.backend.entity.BraceletSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BraceletSizeRepository extends JpaRepository<BraceletSize, Integer> {
    List<BraceletSize> findByCategoryId(Integer categoryId);
}
