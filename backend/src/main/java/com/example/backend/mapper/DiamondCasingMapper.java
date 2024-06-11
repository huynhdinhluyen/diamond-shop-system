package com.example.backend.mapper;
import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.entity.Size;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.exception.SizeNotFoundException;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DiamondCasingMapper {
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private SizeMapper sizeMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SizeRepository sizeRepository;

    public DiamondCasingDTO toDto(DiamondCasing diamondCasing) {
        if (diamondCasing == null) {
            return null;
        }
        DiamondCasingDTO diamondCasingDTO = new DiamondCasingDTO();
        diamondCasingDTO.setId(diamondCasing.getId());
        diamondCasingDTO.setMaterial(diamondCasing.getMaterial());
        diamondCasingDTO.setPrice(diamondCasing.getPrice());
        diamondCasingDTO.setCategory(categoryMapper.toDto(diamondCasing.getCategory()));
        diamondCasingDTO.setSize(sizeMapper.toDto(diamondCasing.getSize()));
        return diamondCasingDTO;
    }

    public DiamondCasing toEntity(DiamondCasingDTO diamondCasingDTO) {
        if (diamondCasingDTO == null) {
            return null;
        }
        DiamondCasing diamondCasing = new DiamondCasing();
        diamondCasing.setId(diamondCasingDTO.getId());
        diamondCasing.setMaterial(diamondCasingDTO.getMaterial());
        diamondCasing.setPrice(diamondCasingDTO.getPrice());
        diamondCasing.setCategory(categoryMapper.toEntity(diamondCasingDTO.getCategory()));
        diamondCasing.setSize(sizeMapper.toEntity(diamondCasingDTO.getSize()));
        return diamondCasing;
    }

    public List<DiamondCasingDTO> toDtoList(List<DiamondCasing> diamondCasings) {
        return diamondCasings.stream().map(this::toDto).collect(Collectors.toList());
    }
}
