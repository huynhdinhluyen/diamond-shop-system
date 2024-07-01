package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.MembershipLevel;
import com.example.backend.exception.MembershipLevelNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.mapper.MembershipLevelMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.MembershipLevelRepository;
import com.example.backend.request.ChangePasswordRequest;
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

import java.util.Date;
import java.util.Map;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private UserDetailsService userDetailsService;
    private final MembershipLevelRepository membershipLevelRepository;
    private final MembershipLevelMapper membershipLevelMapper;
    private final EmailSenderService mailservice;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 UserDetailsService userDetailsService,
                                 EmailSenderService mailservice, UserRepository userRepository, UserMapper userMapper,
                                 MembershipLevelRepository membershipLevelRepository, MembershipLevelMapper membershipLevelMapper) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.mailservice = mailservice;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.membershipLevelRepository = membershipLevelRepository;
        this.membershipLevelMapper = membershipLevelMapper;
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
            MembershipLevel membershipLevel = membershipLevelRepository.findByName("BRONZE")
                    .orElseThrow(() -> new MembershipLevelNotFoundException("Not Found"));
            user.setMembershipLevel(membershipLevel);
            user = repository.save(user);
            mailservice.sendSimpleMail(user.getEmail(),
                    "sub",
                    "123");
            Map<String, Object> tokenResponse = jwtService.generateToken(user);
            String token = (String) tokenResponse.get("token");
            Date expiration = (Date) tokenResponse.get("expiration");
            return new AuthenticationResponse(token, user, expiration, membershipLevelMapper );
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Đăng ký thất bại, vui lòng thử lại sau!");
        }
    }

    public AuthenticationResponse authenticate(User request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUsername(),
//                        request.getPassword()
//                ));
//        User user = repository.findByUsername(request.getUsername()).orElseThrow();
//        logger.info("Received change password request: {}", request);
//        String token = jwtService.generateToken(user);
//        return new AuthenticationResponse(token, user);
        try {
            logger.info("Starting authentication for user: {}", request.getUsername());
            // Log before authentication
            logger.info("Before authenticationManager.authenticate");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    ));
            // Log after successful authentication
            logger.info("After authenticationManager.authenticate");
            User user = repository.findByUsername(request.getUsername()).orElseThrow(() ->
                    new UsernameNotFoundException("User not found: " + request.getUsername()));
            logger.info("User found: {}", user.getUsername());
            Map<String, Object> tokenResponse = jwtService.generateToken(user);
            String token = (String) tokenResponse.get("token");
            Date expiration = (Date) tokenResponse.get("expiration");
            logger.info("Token generated for user: {}", user.getUsername());
            user.setAccessToken(token);
            repository.save(user);
            logger.info("ACToken generated for user: {}", user.getAccessToken());
            return new AuthenticationResponse(token, user, expiration, membershipLevelMapper);
        } catch (Exception e) {
            logger.error("Error during authentication", e);
            throw e;
        }
    }

    public void changePassword(ChangePasswordRequest passwordChangeRequest) {
        User user = repository.findByUsername(passwordChangeRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        if (!passwordChangeRequest.getNewPassword().equals(passwordChangeRequest.getConfirmPassword())) {
            throw new RuntimeException("New passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
        repository.save(user);
        //tesst
    }

    public User getUserFromToken(String token) {
        String username = jwtService.extractUsername(token);
        logger.info("User found: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
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
            Map<String, Object> tokenResponse = jwtService.generateToken(user);
            String token = (String) tokenResponse.get("token");
            Date expiration = (Date) tokenResponse.get("expiration");

            return new AuthenticationResponse(token, user, expiration, membershipLevelMapper);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Cập nhật nguời dùng thất bại, vui lòng thử lại!");
        }
    }

    public AuthenticationResponse getUserByUsername(String username) {
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        Map<String, Object> tokenResponse = jwtService.generateToken(user);
        String token = (String) tokenResponse.get("token");
        Date expiration = (Date) tokenResponse.get("expiration");

        return new AuthenticationResponse(token, user, expiration, membershipLevelMapper);
    }

}
