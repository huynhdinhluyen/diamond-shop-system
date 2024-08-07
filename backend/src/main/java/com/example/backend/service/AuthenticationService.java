package com.example.backend.service;

import com.example.backend.entity.MembershipLevel;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.enums.UserVerifyStatus;
import com.example.backend.exception.MembershipLevelNotFoundException;
import com.example.backend.mapper.MembershipLevelMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.MembershipLevelRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.request.ResetPasswordRequest;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.util.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserDetailsService userDetailsService;
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
            throw new Exception("Tên người dùng đã tồn tại!");
        }
        if (repository.existsByEmail(request.getEmail())) {
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
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            user.setAccessToken(accessToken);
            user.setRefreshToken(refreshToken);
            MembershipLevel membershipLevel = membershipLevelRepository.findByName("BRONZE")
                    .orElseThrow(() -> new MembershipLevelNotFoundException("Not Found"));
            user.setMembershipLevel(membershipLevel);
            String emailVerifiticationToken = jwtService.generateEmailVerifyToken(user);
            user.setVerificationCode(emailVerifiticationToken);
//            mailservice.sendSimpleMail(user, emailVerifiticationToken,
//                    "Register confirmation",
//                    "your code: ");
            Date expiration = jwtService.extractExpiration(accessToken);
            userRepository.save(user);
            return new AuthenticationResponse(accessToken, user, expiration, membershipLevelMapper);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Đăng ký thất bại, vui lòng thử lại sau!");
        }
    }

    public String registerConfirmed(String emailVerifyToken, String accessToken) throws Exception {
        User user = userRepository.findByUsername(jwtService.extractUsername(accessToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String sentCode = user.getVerificationCode().substring(164, 169);
        if (!sentCode.equals(emailVerifyToken)) {
            return "invalid verification code";
        } else {
            user.setAccountStatus(UserVerifyStatus.Verified);
            user.setVerificationCode("");
            userRepository.save(user);
            return "Registration confirmed. Your account is now verified";
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
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            logger.info("access token generated for user: {}", user.getUsername());
            user.setAccessToken(accessToken);
            user.setRefreshToken(refreshToken);
            repository.save(user);
            Date expiration = jwtService.extractExpiration(accessToken);
            return new AuthenticationResponse(accessToken, user, expiration, membershipLevelMapper);
        } catch (Exception e) {
            logger.error("Error during authentication", e);
            throw e;
        }
    }

    public void changePassword(ChangePasswordRequest passwordChangeRequest) {
        String username = jwtService.extractUsername(passwordChangeRequest.getAccessToken());
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
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
        mailservice.sendSimpleMail(user, jwtService.generateFogotPasswordToken(user),
                "your code:  ",
                "Reset password: ");
        return "check your mail";
    }

    public User getUserFromToken(String token) {
        String username = jwtService.extractUsername(token);
        logger.info("User found: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public AuthenticationResponse getUserById(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        String accessToken = user.getAccessToken();
        Date expiration = jwtService.extractExpiration(accessToken);
        return new AuthenticationResponse(accessToken, user, expiration, membershipLevelMapper);
    }

    public AuthenticationResponse loginGoogle(User googleUser) {
        Optional<User> optionalUser = userRepository.findByEmail(googleUser.getEmail());
        User user;
        String accessToken;
        String refreshToken;
        Date expiration;
        if (optionalUser.isEmpty()) {
            user = new User();
            user.setEmail(googleUser.getEmail());
            user.setFirstName(googleUser.getFirstName());
            user.setLastName(googleUser.getLastName());
            user.setUsername(googleUser.getEmail());
            user.setRoleName(RoleName.CUSTOMER);

            accessToken = jwtService.generateAccessToken(user);
            refreshToken = jwtService.generateRefreshToken(user);
            String emailVerificationToken = jwtService.generateEmailVerifyToken(user);

            user.setVerificationCode(emailVerificationToken);
            user.setAccessToken(accessToken);
            user.setRefreshToken(refreshToken);

            MembershipLevel membershipLevel = membershipLevelRepository.findByName("BRONZE")
                    .orElseThrow(() -> new MembershipLevelNotFoundException("Membership level not found"));
            user.setMembershipLevel(membershipLevel);
            userRepository.save(user);
            expiration = jwtService.extractExpiration(accessToken);
        } else {
            user = optionalUser.get();
            accessToken = jwtService.generateAccessToken(user);
            refreshToken = jwtService.generateRefreshToken(user);
            user.setAccessToken(accessToken);
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
            expiration = jwtService.extractExpiration(accessToken);
        }

        return new AuthenticationResponse(accessToken, user, expiration, membershipLevelMapper);
    }
}
