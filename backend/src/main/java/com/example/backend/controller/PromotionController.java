package com.example.backend.controller;

import com.example.backend.dto.PromotionDTO;
import com.example.backend.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
public class PromotionController {
    private final PromotionService promotionService;

    @GetMapping
    public ResponseEntity<List<PromotionDTO>> getAllPromotions(){
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }
}
