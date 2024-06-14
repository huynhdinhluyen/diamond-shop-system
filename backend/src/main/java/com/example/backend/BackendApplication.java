package com.example.backend;

import com.example.backend.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class BackendApplication {

//	@Autowired
//	private EmailSenderService mailservice;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

//	@EventListener(ApplicationReadyEvent.class)
//	public void sendMail() {
//		mailservice.sendSimpleMail("duytranbao16503@gmail.com",
//				"test",
//				"body");
//	}

}
