package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.request.ResetPasswordRequest;
import com.example.backend.request.VerifyAccountRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final AuthenticationService authService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserController(AuthenticationService authService, UserService userService, UserRepository userRepository, JwtService jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ) throws Exception {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/accountVerified")
    public ResponseEntity<String> verifyAccount(
            @RequestBody VerifyAccountRequest request
    ) throws Exception {
        return ResponseEntity.ok(authService.
                registerConfirmed(request.getVerificationCode(), request.getAccessToken()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    /* HEAD
    @GetMapping("/get-user-token")
    public ResponseEntity<UserDetails> getUserDetails(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer")) {
            String jwtToken = token.substring(7);
            UserDetails userDetails = authService.getUserDetailsFromToken(jwtToken);
            return ResponseEntity.ok(userDetails);
        }
        return ResponseEntity.badRequest().build();
    }
     */

//    @PostMapping("/change-password")
//    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordChangeRequest) {
//        //logger.info("Received change password request: {}", passwordChangeRequest);
//        authService.changePassword(passwordChangeRequest);
//        return ResponseEntity.ok("Password changed successfully");
//    }

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
    public ResponseEntity<User> updateUserByAdmin(@PathVariable Integer id,
                                                                    @RequestBody User request) {
        try {
            User user = userService.updateUserByAdmin(id, request);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
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

    @PostMapping("/forget-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordChangeRequest) {
        authService.changePassword(passwordChangeRequest);
        return ResponseEntity.ok("Password changed successfully");
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<AuthenticationResponse> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(authService.getUserById(id));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthenticationResponse> googleLogin(@RequestBody User googleUser) {
        return ResponseEntity.ok(authService.loginGoogle(googleUser));
    }

    @PutMapping("/{userId}/block")
    public ResponseEntity<User> blockUser(@PathVariable Integer userId) {
        User blockedUser = userService.blockUser(userId);
        return ResponseEntity.ok(blockedUser);
    }

    @PutMapping("/{userId}/unblock")
    public ResponseEntity<User> unblockUser(@PathVariable Integer userId) {
        User unblockedUser = userService.unblockUser(userId);
        return ResponseEntity.ok(unblockedUser);
    }
}