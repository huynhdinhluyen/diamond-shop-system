package com.example.backend.controller;

import com.example.backend.data.LoginForm;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.Role;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
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

    @GetMapping("byRole")
    public ResponseEntity<List<User>> findUsersByRole(@RequestParam("role") Role role) {
        List<User> users = userService.findByRole(role);
        return ResponseEntity.ok(users);
    }


    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("login")
    public ResponseEntity<User> login(@RequestBody LoginForm loginForm) {
        User user = userService.login(loginForm.getEmail(), loginForm.getPassword());
        return ResponseEntity.ok(user);
    }
}
