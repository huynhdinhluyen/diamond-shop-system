package com.example.backend.controller;

import com.example.backend.entity.RingSize;
import com.example.backend.entity.NecklaceSize;
import com.example.backend.entity.BraceletSize;
import com.example.backend.mapper.BraceletSizeMapper;
import com.example.backend.mapper.NecklaceSizeMapper;
import com.example.backend.mapper.RingSizeMapper;
import com.example.backend.repository.RingSizeRepository;
import com.example.backend.repository.NecklaceSizeRepository;
import com.example.backend.repository.BraceletSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sizes")
public class SizeController {

    @Autowired
    private RingSizeRepository ringSizeRepository;

    @Autowired
    private NecklaceSizeRepository necklaceSizeRepository;

    @Autowired
    private BraceletSizeRepository braceletSizeRepository;

    @Autowired
    private RingSizeMapper ringSizeMapper;

    @Autowired
    private NecklaceSizeMapper necklaceSizeMapper;

    @Autowired
    private BraceletSizeMapper braceletSizeMapper;

    @GetMapping("/{categoryId}")
    public List<?> getSizesByCategoryId(@PathVariable Integer categoryId) {
        return switch (categoryId) {
            case 1 -> ringSizeMapper.toDtoList(ringSizeRepository.findAll());
            case 2 -> necklaceSizeMapper.toDtoList(necklaceSizeRepository.findAll());
            case 5 -> braceletSizeMapper.toDtoList(braceletSizeRepository.findAll());
            default -> throw new IllegalArgumentException("Invalid category ID");
        };
    }
}
