package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Long countByRoleName(RoleName roleName);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Integer userID);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUsername(String username);

    @Query(value = "select * from [user] where role = :roleName", nativeQuery = true)
    List<User> findByRoleName(@Param("roleName") String roleName);

}
