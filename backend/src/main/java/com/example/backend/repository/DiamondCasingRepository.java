package com.example.backend.repository;

import com.example.backend.entity.DiamondCasing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiamondCasingRepository extends JpaRepository<DiamondCasing, Integer> {
}
