package com.example.backend.controller;

import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.entity.User;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {
    private final AuthenticationService authService;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(AuthenticationService authService, UserService userService) {
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
}
