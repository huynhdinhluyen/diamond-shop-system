package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SizeService {
    List<?> getSizesByCategoryId(Integer categoryId);
}
