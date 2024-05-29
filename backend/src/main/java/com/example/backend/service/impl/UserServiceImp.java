package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::maptoUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        Role role = roleRepository.findById(userDTO.getRole().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        userDTO.setRole(role);
        User newUser = UserMapper.maptoUserEntity(userDTO);
        User savedUser = userRepository.save(newUser);
        return UserMapper.maptoUserDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalCustomers() {
        return userRepository.countByRole_RoleName("CUSTOMER");
    }
}
