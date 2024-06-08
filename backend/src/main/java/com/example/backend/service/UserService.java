package com.example.backend.service;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Long getTotalCustomers();
    //List<User> findByRole(User.RoleName role);
    List<UserDTO> getAllUsers();
    //UserDTO addUser(UserDTO userDTO);
    //User login(String email, String password);
    User getUserById(Integer id);
    User updateUser(Integer userId, User updatedUser);
}
