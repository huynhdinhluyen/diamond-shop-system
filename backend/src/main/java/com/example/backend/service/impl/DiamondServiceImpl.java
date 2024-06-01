package com.example.backend.service.impl;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.entity.Diamond;
import com.example.backend.mapper.DiamondMapper;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.service.DiamondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiamondServiceImpl implements DiamondService {
    @Autowired
    private DiamondRepository diamondRepository;
    @Autowired
    private DiamondMapper diamondMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DiamondDTO> getAllDiamonds() {
        List<Diamond> diamonds = diamondRepository.findAll();
        return diamonds.stream()
                .map(diamondMapper::toDto)
                .collect(Collectors.toList());
    }
}
