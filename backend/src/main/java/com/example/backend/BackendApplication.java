package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
