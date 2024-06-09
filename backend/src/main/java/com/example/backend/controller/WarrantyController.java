package com.example.backend.controller;

import com.example.backend.dto.WarrantyDTO;
import com.example.backend.service.WarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/warranties")
@RequiredArgsConstructor
public class WarrantyController {
    private final WarrantyService warrantyService;

    @GetMapping
    public ResponseEntity<List<WarrantyDTO>> getAllWarranties() {
        return ResponseEntity.ok(warrantyService.getAllWarranties());
    }
}
