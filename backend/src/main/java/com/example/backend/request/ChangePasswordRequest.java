package com.example.backend.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String resetPasswordToken;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
