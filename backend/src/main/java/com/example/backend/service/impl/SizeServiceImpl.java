package com.example.backend.service.impl;

import com.example.backend.dto.SizeDTO;
import com.example.backend.entity.Size;
import com.example.backend.mapper.SizeMapper;
import com.example.backend.repository.SizeRepository;
import com.example.backend.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;
    private final SizeMapper sizeMapper;

    @Override
    @Transactional(readOnly = true)
    public List<SizeDTO> getAllSizes() {
        List<Size> sizes = sizeRepository.findAll();
        return sizes.stream()
                .map(sizeMapper::toDto)
                .collect(Collectors.toList());
    }
}
