package com.example.backend.service;

import com.example.backend.dto.DiamondCasingDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiamondCasingService {
    List<DiamondCasingDTO> getDiamondCasings();
}
