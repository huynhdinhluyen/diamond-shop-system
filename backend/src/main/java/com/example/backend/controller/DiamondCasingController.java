package com.example.backend.controller;

import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.service.DiamondCasingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/diamond-casings")
@RequiredArgsConstructor
public class DiamondCasingController {
    private final DiamondCasingService diamondCasingService;

    @GetMapping
    public ResponseEntity<List<DiamondCasingDTO>> getAllDiamondCasings() {
        return ResponseEntity.ok(diamondCasingService.getDiamondCasings());
    }
}
