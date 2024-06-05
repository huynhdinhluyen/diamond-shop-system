package com.example.backend.service.impl;

import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;

//    @Override
//    public List<User> findByRole(RoleName roleName) {
//            return userRepository.findByRole(roleName.name());
//    }
}
