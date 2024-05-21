package com.example.backend.repository;

import com.example.backend.entity.Diamond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiamondRepository extends JpaRepository<Diamond, Integer> {
}
