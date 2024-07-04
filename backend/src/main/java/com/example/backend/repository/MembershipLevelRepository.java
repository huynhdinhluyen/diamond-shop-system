package com.example.backend.repository;

import com.example.backend.entity.MembershipLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MembershipLevelRepository extends JpaRepository<MembershipLevel, Integer> {
    Optional<MembershipLevel> findByName(String name);

    Optional<MembershipLevel> findByMinPointsLessThanEqualAndMaxPointsGreaterThanEqual(int minPoints, int maxPoints);

    Optional<MembershipLevel> findByMinPointsLessThanEqualAndMaxPointsIsNull(int minPoints);
}
