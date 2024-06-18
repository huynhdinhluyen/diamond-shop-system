package com.example.backend.service.impl;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.entity.Diamond;
import com.example.backend.exception.DiamondNotFoundException;
import com.example.backend.mapper.DiamondMapper;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.service.DiamondService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiamondServiceImpl implements DiamondService {
    private final DiamondRepository diamondRepository;
    private final DiamondMapper diamondMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DiamondDTO> getAllDiamonds() {
        List<Diamond> diamonds = diamondRepository.findAll();
        return diamonds.stream()
                .map(diamondMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DiamondDTO createDiamond(DiamondDTO diamondDTO) {
        Diamond diamond = diamondMapper.toEntity(diamondDTO);
        return diamondMapper.toDto(diamondRepository.save(diamond));
    }

    @Override
    public DiamondDTO updateDiamond(Integer id, DiamondDTO diamondDTO) {
        Diamond existingDiamond = diamondRepository.findById(id).orElseThrow(() -> new DiamondNotFoundException(id));
        existingDiamond.setColor(diamondDTO.getColor());
        existingDiamond.setOrigin(diamondDTO.getOrigin());
        existingDiamond.setCaratWeight(diamondDTO.getCaratWeight());
        existingDiamond.setCutType(diamondDTO.getCutType());
        existingDiamond.setClarity(diamondDTO.getClarity());
        existingDiamond.setGiaCertificate(diamondDTO.getGiaCertificate());
        existingDiamond.setPrice(diamondDTO.getPrice());
        existingDiamond.setSize(diamondDTO.getSize());
        return diamondMapper.toDto(diamondRepository.save(existingDiamond));
    }

    @Override
    public void deleteDiamond(Integer id) {
        if (!diamondRepository.existsById(id)) {
            throw new DiamondNotFoundException(id);
        }
        diamondRepository.deleteById(id);
    }
}
