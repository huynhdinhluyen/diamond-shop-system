package com.example.backend.service;


import com.example.backend.dto.UserDTO;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO addUser(UserDTO userDTO);
}
