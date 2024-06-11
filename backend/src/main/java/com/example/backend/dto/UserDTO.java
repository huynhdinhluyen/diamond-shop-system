package com.example.backend.dto;

import com.example.backend.enums.RoleName;
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
    private String city;
    private String address;
    private RoleName role_id;
    private String verificationCode;
    private String accessToken;
    private String refreshToken;
//    private boolean enabled;

    public UserDTO(Integer id, String username) {
        this.id = id;
        this.username = username;
    }
}
