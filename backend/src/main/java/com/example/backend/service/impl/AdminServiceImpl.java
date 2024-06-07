package com.example.backend.service.impl;

import com.example.backend.controller.UserController;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Override
    public List<UserDTO> findByRole(RoleName roleName) {
        logger.info("findByRole {}", roleName);
        List<User> users = userRepository.findByRoleName(roleName.name());
        logger.info("after {}", users);
        return users.stream().map(UserMapper::maptoUserDTO)
                .collect(Collectors.toList());
    }
}
