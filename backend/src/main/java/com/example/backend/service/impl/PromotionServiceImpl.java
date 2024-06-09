package com.example.backend.service.impl;

import com.example.backend.dto.PromotionDTO;
import com.example.backend.entity.Promotion;
import com.example.backend.mapper.PromotionMapper;
import com.example.backend.repository.PromotionRepository;
import com.example.backend.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {
    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;

    @Override
    public List<PromotionDTO> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        return promotionMapper.toDtoList(promotions);
    }
}
