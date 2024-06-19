package com.example.backend.service.impl;

import com.example.backend.entity.BraceletSize;
import com.example.backend.entity.NecklaceSize;
import com.example.backend.entity.RingSize;
import com.example.backend.mapper.BraceletSizeMapper;
import com.example.backend.mapper.NecklaceSizeMapper;
import com.example.backend.mapper.RingSizeMapper;
import com.example.backend.repository.BraceletSizeRepository;
import com.example.backend.repository.NecklaceSizeRepository;
import com.example.backend.repository.RingSizeRepository;
import com.example.backend.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {

    private final RingSizeRepository ringSizeRepository;
    private final NecklaceSizeRepository necklaceSizeRepository;
    private final BraceletSizeRepository braceletSizeRepository;
    private final RingSizeMapper ringSizeMapper;
    private final NecklaceSizeMapper necklaceSizeMapper;
    private final BraceletSizeMapper braceletSizeMapper;

    @Override
    public List<?> getSizesByCategoryId(Integer categoryId) {
        List<RingSize> ringSizes = ringSizeRepository.findByCategoryId(categoryId);
        if (!ringSizes.isEmpty()) {
            return ringSizeMapper.toDtoList(ringSizes);
        }

        List<NecklaceSize> necklaceSizes = necklaceSizeRepository.findByCategoryId(categoryId);
        if (!necklaceSizes.isEmpty()) {
            return necklaceSizeMapper.toDtoList(necklaceSizes);
        }

        List<BraceletSize> braceletSizes = braceletSizeRepository.findByCategoryId(categoryId);
        if (!braceletSizes.isEmpty()) {
            return braceletSizeMapper.toDtoList(braceletSizes);
        }

        throw new IllegalArgumentException("Invalid category ID");
    }
}
