package com.example.backend.service;

import com.example.backend.dto.PromotionDTO;
import com.example.backend.entity.Promotion;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface PromotionService {
    List<PromotionDTO> getAllPromotions();
    PromotionDTO addPromotion(PromotionDTO promotion);
}
