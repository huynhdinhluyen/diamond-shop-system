package com.example.backend.service.impl;

import com.example.backend.dto.PromotionDTO;
import com.example.backend.entity.Product;
import com.example.backend.entity.Promotion;
import com.example.backend.mapper.PromotionMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.PromotionRepository;
import com.example.backend.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {
    private static final Logger logger = LoggerFactory.getLogger(PromotionServiceImpl.class);
    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<PromotionDTO> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        return promotionMapper.toDtoList(promotions);
    }

    @Override
    public PromotionDTO addPromotion(PromotionDTO promotionDTO) {
        Promotion promotion = promotionMapper.toEntity(promotionDTO);
        Promotion savedPromotion = promotionRepository.save(promotion);
        return promotionMapper.toDto(savedPromotion);
    }

    @Scheduled(cron = "0 0 0 * * ?") // This cron expression schedules the task to run at midnight every day
    @Transactional
    public void updateExpiredPromotions() {
        logger.info("Running scheduled task: updateExpiredPromotions");

        LocalDate currentDate = LocalDate.now();
        List<Product> products = productRepository.findAll(); // Or fetch only products with active promotions

        for (Product product : products) {
            logger.info("Checking product ID: {}", product.getId());
            if (product.getPromotion() != null) {
                logger.info("Product ID: {} has promotion with end date: {}", product.getId(), product.getPromotion().getEndDate());
                if (!currentDate.isBefore(product.getPromotion().getEndDate())) {
                    product.setPromotion(null);
                    productRepository.save(product);
                    logger.info("Expired promotion removed from product ID: {}", product.getId());
                }
            }
        }
    }
}
