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
                user.getRole(),
                user.getFirstName(),
                user.getLastName(),
                user.getCity(),
                user.getAddress()
        );
    }

    public static User maptoUserEntity(UserDTO dto) {
        return new User(
                dto.getId(),
                dto.getUsername(),
                dto.getPassword(),
                dto.getEmail(),
                dto.getPhoneNumber(),
                dto.getRole(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getCity(),
                dto.getAddress()
        );
    }
}
