package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;

public class UserMapper {
    public static UserDTO maptoUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getFirstName(),
                user.getLastName(),
                user.getCity(),
                user.getAddress(),
                user.getRoleName(),
                user.getVerificationCode()
        );
    }

    public static User maptoUserEntity(UserDTO dto) {
        return new User(
                dto.getId(),
                dto.getUsername(),
                dto.getPassword(),
                dto.getEmail(),
                dto.getPhoneNumber(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getCity(),
                dto.getAddress(),
                dto.getRole_id(),
                dto.getVerificationCode()
        );
    }
}
