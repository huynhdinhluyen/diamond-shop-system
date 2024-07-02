package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;

    public UserController(AuthenticationService authService, UserService userService, UserRepository userRepository) {
        this.authService=authService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ) throws Exception {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordChangeRequest) {
        //logger.info("Received change password request: {}", passwordChangeRequest);
        authService.changePassword(passwordChangeRequest);
        return ResponseEntity.ok("Password changed successfully");
    }

//    @GetMapping("/get-user-token")
//    public ResponseEntity<UserDetails> getUserDetails(@RequestHeader("Authorization") String token) {
//        if (token != null && token.startsWith("Bearer")) {
//            String jwtToken = token.substring(7);
//            UserDetails userDetails = authService.getUserDetailsFromToken(jwtToken);
//            return ResponseEntity.ok(userDetails);
//        }
//        return ResponseEntity.badRequest().build();
//    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam Integer userId, @RequestBody User updatedUser) {
        try {
            User user = userService.updateUser(userId, updatedUser);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<AuthenticationResponse> createUser(
            @RequestBody User request
    ) throws Exception {
        return ResponseEntity.ok(authService.register(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthenticationResponse> updateUserByAdmin(@PathVariable Integer id,
                                                             @RequestBody User request){
        try{
            AuthenticationResponse user = authService.updateUser(id, request);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/role")
    public ResponseEntity<List<UserDTO>> findUsersByRole(@RequestParam RoleName role) {
        List<UserDTO> users = userService.findByRole(role);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<AuthenticationResponse> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(authService.getUserByUsername(username));
    }
}