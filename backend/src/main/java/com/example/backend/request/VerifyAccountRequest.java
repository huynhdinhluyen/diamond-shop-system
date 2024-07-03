package com.example.backend.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyAccountRequest {
    private String verificationCode;
    private String accessToken;
}
