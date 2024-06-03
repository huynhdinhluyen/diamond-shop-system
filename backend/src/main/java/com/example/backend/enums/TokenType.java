package com.example.backend.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TokenType {
    AccessToken,
    RefreshToken,
    ForgotPwToken,
    EmailVerificationToken
}
