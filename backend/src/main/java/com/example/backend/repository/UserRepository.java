package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //List<User> findByRole(User.RoleName roles);
    Long countByRoleName(RoleName roleName);
    Optional<User> findByUsername(String username);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUsername(String username);
}
