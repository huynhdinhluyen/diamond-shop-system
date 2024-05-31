package com.example.backend.mapper;

import com.example.backend.dto.PromotionDTO;
import com.example.backend.entity.Promotion;
import org.springframework.stereotype.Component;

@Component
public class PromotionMapper {
    public PromotionDTO toDto(Promotion promotion) {
        if (promotion == null) {
            return null;
        }
        return new PromotionDTO(
                promotion.getId(),
                promotion.getName(),
                promotion.getDescription(),
                promotion.getDiscountRate(),
                promotion.getStartDate(),
                promotion.getEndDate()
        );
    }
    public Promotion toEntity(PromotionDTO promotionDTO) {
        if (promotionDTO == null) {
            return null;
        }

        Promotion promotion = new Promotion();
        promotion.setId(promotionDTO.getId());
        promotion.setName(promotionDTO.getName());
        promotion.setDescription(promotionDTO.getDescription());
        promotion.setDiscountRate(promotionDTO.getDiscountRate());
        promotion.setStartDate(promotionDTO.getStartDate());
        promotion.setEndDate(promotionDTO.getEndDate());

        return promotion;
    }
}
