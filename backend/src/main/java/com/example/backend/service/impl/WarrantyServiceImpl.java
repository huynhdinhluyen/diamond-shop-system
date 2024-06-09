package com.example.backend.service.impl;

import com.example.backend.dto.WarrantyDTO;
import com.example.backend.entity.Warranty;
import com.example.backend.mapper.WarrantyMapper;
import com.example.backend.repository.WarrantyRepository;
import com.example.backend.service.WarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WarrantyServiceImpl implements WarrantyService {
    private final WarrantyRepository warrantyRepository;
    private final WarrantyMapper warrantyMapper;

    @Override
    @Transactional(readOnly = true)
    public List<WarrantyDTO> getAllWarranties() {
        List<Warranty> warranties = warrantyRepository.findAll();
        return warrantyMapper.toDtoList(warranties);
    }
}
