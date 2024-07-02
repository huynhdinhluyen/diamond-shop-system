package com.example.backend.service;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.response.AuthenticationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Long getTotalCustomers();
    List<UserDTO> getAllUsers();
    //User login(String email, String password);
    User getUserById(Integer id);
    User updateUser(Integer userId, User updatedUser);
    void deleteUser(Integer userId) throws UserNotFoundException;
    List<UserDTO> findByRole(RoleName roleName);
}
