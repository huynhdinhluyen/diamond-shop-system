package com.example.backend.response;

import com.example.backend.dto.MembershipLevelDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.MembershipLevelMapper;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AuthenticationResponse {
    private String accessToken;
    private String refreshToken;
    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
    private String role;
    private MembershipLevelDTO membershipLevel;
    private Integer points;
    private Date expiration;
    private boolean isBlocked;

    public AuthenticationResponse(String accessToken, User user, Date expiration, MembershipLevelMapper membershipLevelMapper) {
        this.accessToken = accessToken;
        this.refreshToken = user.getRefreshToken();
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.address = user.getAddress();
        this.role = String.valueOf(user.getRoleName());
        this.membershipLevel = membershipLevelMapper.toMembershipLevelDTO(user.getMembershipLevel());
        this.points = user.getPoints();
        this.expiration = expiration;
        this.isBlocked = user.isBlocked();
    }
}
