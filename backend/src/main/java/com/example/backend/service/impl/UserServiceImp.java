package com.example.backend.service.impl;

import com.example.backend.enums.Role;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.dto.UserDTO;
//import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
//import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findByRole(Role role) {
        return userRepository.findByRole(role);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::maptoUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User newUser = UserMapper.maptoUserEntity(userDTO);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        User savedUser = userRepository.save(newUser);
        return UserMapper.maptoUserDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalCustomers() {
        return userRepository.totalCustomer();
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
