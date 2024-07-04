package com.example.backend.service;

import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender EmailSender;

    public void sendSimpleMail(User user, String token, String subject, String title) {
        SimpleMailMessage email = new SimpleMailMessage();
        String recipientAddress = user.getEmail();
        email.setTo(recipientAddress);
        email.setText(title + "\n" + subject + "\n" + token.substring(16, 21));
        email.setSubject(subject);
        EmailSender.send(email);
        System.out.println("Mail sent successfully");
    }
}
