package com.example.backend.serviceImplementation;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImp implements UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

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
}
