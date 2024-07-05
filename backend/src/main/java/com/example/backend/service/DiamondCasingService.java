package com.example.backend.service;

import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.exception.DiamondCasingNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiamondCasingService {
    List<DiamondCasingDTO> getDiamondCasings();

    DiamondCasingDTO createDiamondCasing(DiamondCasingDTO diamondCasingDTO);

    DiamondCasingDTO updateDiamondCasing(Integer id, DiamondCasingDTO diamondCasingDTO) throws DiamondCasingNotFoundException;

    void deleteDiamondCasing(Integer id) throws DiamondCasingNotFoundException;
}
