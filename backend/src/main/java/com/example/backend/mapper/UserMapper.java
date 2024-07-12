package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final MembershipLevelMapper membershipLevelMapper;

    public UserDTO maptoUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getRoleName(),
                user.getVerificationCode(),
                user.getAccessToken(),
                user.getRefreshToken(),
                user.getResetPasswordToken(),
                user.getPoints(),
                membershipLevelMapper.toMembershipLevelDTO(user.getMembershipLevel()),
                user.getAccountStatus(),
                user.isBlocked()
        );
    }

    public User maptoUserEntity(UserDTO dto) {
        return new User(
                dto.getId(),
                dto.getUsername(),
                dto.getPassword(),
                dto.getEmail(),
                dto.getPhoneNumber(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getAddress(),
                dto.getRole(),
                dto.getVerificationCode(),
                dto.getAccessToken(),
                dto.getRefreshToken(),
                dto.getResetPasswordToken(),
                dto.getPoints(),
                membershipLevelMapper.toMembershipLevelEntity(dto.getMembershipLevel()),
                dto.getAccountStatus(),
                dto.isBlocked()
        );
    }
}
