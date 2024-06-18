package com.example.backend.repository;

import com.example.backend.entity.NecklaceSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NecklaceSizeRepository extends JpaRepository<NecklaceSize, Integer> {
    List<NecklaceSize> findByCategoryId(Integer categoryId);
}
