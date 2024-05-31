package com.example.backend.service;

import com.example.backend.dto.SizeDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SizeService {
    List<SizeDTO> getAllSizes();
}
