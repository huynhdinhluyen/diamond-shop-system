package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Long countByRoleName(RoleName roleName);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer userID);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    @Query(value = "SELECT * FROM [user] WHERE role = :roleName", nativeQuery = true)
    List<User> findByRole(@Param("roleName") String roleName);
}
