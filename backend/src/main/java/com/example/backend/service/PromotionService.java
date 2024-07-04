package com.example.backend.service;

import com.example.backend.dto.PromotionDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PromotionService {
    List<PromotionDTO> getAllPromotions();

    PromotionDTO addPromotion(PromotionDTO promotion);
}
