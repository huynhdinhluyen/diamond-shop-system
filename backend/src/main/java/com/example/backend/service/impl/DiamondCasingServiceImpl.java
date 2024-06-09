package com.example.backend.service.impl;

import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.mapper.DiamondCasingMapper;
import com.example.backend.repository.DiamondCasingRepository;
import com.example.backend.service.DiamondCasingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiamondCasingServiceImpl implements DiamondCasingService {
    private final DiamondCasingRepository diamondCasingRepository;
    private final DiamondCasingMapper diamondCasingMapper;
    @Override
    @Transactional(readOnly = true)
    public List<DiamondCasingDTO> getDiamondCasings() {
        List<DiamondCasing> diamondCasings = diamondCasingRepository.findAll();
        return diamondCasingMapper.toDtoList(diamondCasings);
    }
}
