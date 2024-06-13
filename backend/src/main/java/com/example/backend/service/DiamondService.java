package com.example.backend.service;

import com.example.backend.dto.DiamondDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiamondService {
    List<DiamondDTO> getAllDiamonds();
    DiamondDTO createDiamond(DiamondDTO diamond);
    DiamondDTO updateDiamond(Integer id, DiamondDTO diamond);
    void deleteDiamond(Integer id);
}
