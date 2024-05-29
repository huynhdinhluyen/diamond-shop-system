package com.example.backend.service;


import com.example.backend.dto.UserDTO;
import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO addUser(UserDTO userDTO);
    Long getTotalCustomers();
}
