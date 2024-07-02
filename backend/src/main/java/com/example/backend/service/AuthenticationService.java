package com.example.backend.service;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.request.ResetPasswordRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private UserDetailsService userDetailsService;
    private final EmailSenderService mailservice;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 UserDetailsService userDetailsService,
                                 EmailSenderService mailservice) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.mailservice = mailservice;
    }

    public AuthenticationResponse register(User request) throws Exception {
        if (repository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new Exception("Số điện thoại đã tồn tại!");
        }
        if (repository.existsByUsername(request.getUsername())) {
            throw new Exception("Người dùng đã tồn tại!");
        }
        if(repository.existsByEmail(request.getEmail())) {
            throw new Exception("Email đã tồn tại!");
        }
        try {
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRoleName(request.getRoleName());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setEmail(request.getEmail());
            user.setAddress(request.getAddress());
            user.setCity(request.getCity());
            //user = repository.save(user);
            mailservice.sendSimpleMail(user.getEmail(),
                    "verifitication",
                    "123"); // random
            //String token = jwtService.generateAccessToken(user);
            return new AuthenticationResponse("sudo token", user);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Đăng ký thất bại, vui lòng thử lại sau!");
        }
    }

    public AuthenticationResponse authenticate(User request) {
        try {
            logger.info("Before authenticationManager.authenticate");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    ));
            logger.info("After authenticationManager.authenticate");
            User user = repository.findByUsername(request.getUsername()).orElseThrow(() ->
                    new UsernameNotFoundException("User not found: " + request.getUsername()));
            logger.info("User found: {}", user.getUsername());
            String token = jwtService.generateAccessToken(user);
            logger.info("access token generated for user: {}", user.getUsername());
            user.setAccessToken(token);
            repository.save(user);
            logger.info("ACToken generated for user: {}", user.getAccessToken());
            return new AuthenticationResponse(token, user);
        } catch (Exception e) {
            logger.error("Error during authentication", e);
            throw e;
        }
    }

    public void changePassword(ChangePasswordRequest passwordChangeRequest) {
        String username = jwtService.extractUsername(passwordChangeRequest.getResetPasswordToken());
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getResetPasswordToken().equalsIgnoreCase(passwordChangeRequest.getResetPasswordToken())) {
            throw new RuntimeException("Invalid");
        }
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        if (!passwordChangeRequest.getNewPassword().equals(passwordChangeRequest.getConfirmPassword())) {
            throw new RuntimeException("New passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
        repository.save(user);
    }

    public String resetPassword(ResetPasswordRequest request) {
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.generateFogotPasswordToken(user);
        user.setResetPasswordToken(token);
        repository.save(user);
        logger.info("Reset password token saved: {}", token);
        mailservice.sendSimpleMail(request.getEmail(),
                "reset password",
                "your thing: " +token);
        return "check your mail";
    }

    public UserDetails getUserDetailsFromToken(String token) {
        String username = jwtService.extractUsername(token);
        return userDetailsService.loadUserByUsername(username);
    }

    public AuthenticationResponse updateUser(Integer userId, User request) throws Exception {
        User user = repository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        try {
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRoleName(request.getRoleName());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setEmail(request.getEmail());
            user.setAddress(request.getAddress());
            user.setCity(request.getCity());
            user = repository.save(user);
            String token = jwtService.generateAccessToken(user);
            return new AuthenticationResponse(token, user);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Cập nhật nguời dùng thất bại, vui lòng thử lại!");
        }
    }
}
