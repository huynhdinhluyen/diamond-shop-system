package com.example.backend.config;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfig {
    @Value("${paypal.client-id}")
    private String paypal_client_id;

    @Value("${paypal.client-secret}")
    private String paypal_client_secret;

    @Value("${paypal.mode}")
    private String mode;

    @Bean
    public APIContext apiContext() {
        return new APIContext(paypal_client_id,
                paypal_client_secret,
                mode);
    }
}
