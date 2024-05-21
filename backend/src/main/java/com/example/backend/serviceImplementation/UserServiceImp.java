package com.example.backend.serviceImplementation;

import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImp implements UserService {
    private UserRepository userRepository;
}
