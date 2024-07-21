package com.example.backend.repository;

import com.example.backend.entity.Collections;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collections, Integer> {
}
