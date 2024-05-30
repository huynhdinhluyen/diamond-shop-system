package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRole(Role role);
    //Long countByRoleName(Role role);
    User findByEmail(String email);

}
