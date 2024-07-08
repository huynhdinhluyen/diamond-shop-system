package com.example.backend.dto;

import com.example.backend.enums.RoleName;
import com.example.backend.enums.UserVerifyStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String address;
    private RoleName role;
    private String verificationCode;
    private String accessToken;
    private String refreshToken;
    private String resetPasswordToken;
    private Integer points;
    private MembershipLevelDTO membershipLevel;
    private UserVerifyStatus accountStatus;
}