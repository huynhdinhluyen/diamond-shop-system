package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class  EmailSenderService {
    @Autowired
    private JavaMailSender EmailSender;

    public void sendSimpleMail(String to,
                               String subject,
                               String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("DHLDiamond");
        message.setTo(to);
        message.setText(body);
        message.setSubject(subject);
        EmailSender.send(message);

        System.out.println("mail sent successfully");
    }
}
