package com.example.backend.controller;

import com.example.backend.dto.SizeDTO;
import com.example.backend.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sizes")
@RequiredArgsConstructor
public class SizeController {
    private final SizeService sizeService;

    @GetMapping
    public ResponseEntity<List<SizeDTO>> getAllSizes() {
        List<SizeDTO> sizes = sizeService.getAllSizes();
        return ResponseEntity.ok(sizes);
    }
}
