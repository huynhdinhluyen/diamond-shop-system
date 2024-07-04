package com.example.backend.controller;

import com.example.backend.mapper.BraceletSizeMapper;
import com.example.backend.mapper.NecklaceSizeMapper;
import com.example.backend.mapper.RingSizeMapper;
import com.example.backend.repository.BraceletSizeRepository;
import com.example.backend.repository.NecklaceSizeRepository;
import com.example.backend.repository.RingSizeRepository;
import com.example.backend.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @Autowired
    private SizeService sizeService;

    @GetMapping("/{categoryId}")
    public List<?> getSizesByCategoryId(@PathVariable Integer categoryId) {
        return sizeService.getSizesByCategoryId(categoryId);
    }
}
