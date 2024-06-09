package com.example.backend.service;

import com.example.backend.dto.WarrantyDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WarrantyService {
    List<WarrantyDTO> getAllWarranties();
}
