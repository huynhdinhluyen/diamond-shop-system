package com.example.backend.controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    //Get all users REST API
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> employees = userService.getAllUsers();
        return ResponseEntity.ok(employees);
    }

    //Add a user REST API
    @PostMapping("addUser")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
        UserDTO dto = userService.addUser(userDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
}
