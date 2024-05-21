package com.example.backend.dto;

import com.example.backend.entity.Role;
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
    private Role role;
    private String firstName;
    private String lastName;
    private String city;
    private String address;
}
