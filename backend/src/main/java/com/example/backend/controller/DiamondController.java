package com.example.backend.controller;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.service.DiamondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/diamonds")
public class DiamondController {
    @Autowired
    private DiamondService diamondService;

    @GetMapping
    public ResponseEntity<List<DiamondDTO>> getAllDiamonds() {
        List<DiamondDTO> diamonds = diamondService.getAllDiamonds();
        return ResponseEntity.ok(diamonds);
    }
}
