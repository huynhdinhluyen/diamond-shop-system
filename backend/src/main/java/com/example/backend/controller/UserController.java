package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    //Get all users REST API
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> employees = userService.getAllUsers();
        return ResponseEntity.ok(employees);
    }

    public UserController(AuthenticationService authService, UserService userService) {
        this.authService=authService;
        this.userService = userService;
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

    //Add a user REST API
//    @PostMapping("/addUser")
//    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
//        UserDTO dto = userService.addUser(userDTO);
//        return new ResponseEntity<>(dto, HttpStatus.CREATED);
//    }


//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody LoginForm loginForm) {
//        User user = userService.login(loginForm.getEmail(), loginForm.getPassword());
//        return ResponseEntity.ok(user);
//    }
}
