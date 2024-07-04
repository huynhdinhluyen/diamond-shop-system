package com.example.backend.service.impl;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public Long getTotalCustomers() {
        return userRepository.countByRoleName(RoleName.CUSTOMER);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::maptoUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User updateUser(Integer userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        user.setLastName(updatedUser.getLastName());
        user.setFirstName(updatedUser.getFirstName());
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setAddress(updatedUser.getAddress());
        // Cập nhật các thuộc tính khác của người dùng
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) throws UserNotFoundException {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> findByRole(RoleName roleName) {
        List<User> users = userRepository.findByRole(roleName.name());
        return users.stream().map(userMapper::maptoUserDTO)
                .collect(Collectors.toList());
    }
}
