package com.example.backend.controller;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.PromotionDTO;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.exception.PromotionNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.response.PromotionDeleteResponse;
import com.example.backend.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping
    public ResponseEntity<List<PromotionDTO>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }

    @PostMapping("/add")
    public ResponseEntity<PromotionDTO> createPromotion(@RequestBody PromotionDTO promotionDTO) {
        PromotionDTO createdPromotion = promotionService.addPromotion(promotionDTO);
        return ResponseEntity.ok(createdPromotion);
    }

    @PutMapping("/{PromotionId}")
    public ResponseEntity<String> updatePromotion(@PathVariable Integer PromotionId,
                                                       @RequestBody PromotionDTO promotionDTO) {
        try {
            if(promotionService.updatePromotion(PromotionId, promotionDTO) != null){
                return ResponseEntity.ok("Promotion updated successfully");
            } else {
                return ResponseEntity.ok("Promotion updating failed");
            }
        } catch (PromotionNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @DeleteMapping(path = "/{PromotionId}", produces = "application/json")
    public ResponseEntity<String> deletePromotion(@PathVariable Integer PromotionId) {
        try {
            promotionService.deletePromotion(PromotionId);
            return ResponseEntity.ok("Promotion deleted successfully");
        } catch (PromotionNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }



}
