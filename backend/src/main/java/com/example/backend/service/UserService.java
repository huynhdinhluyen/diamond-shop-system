package com.example.backend.service;


import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.Role;

import java.util.List;

public interface UserService {
    List<User> findByRole(Role role);
    List<UserDTO> getAllUsers();
    UserDTO addUser(UserDTO userDTO);
    //Long getTotalCustomers();

    //
    User login(String email, String password);
}
