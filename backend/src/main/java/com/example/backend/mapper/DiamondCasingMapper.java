package com.example.backend.mapper;
import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DiamondCasingMapper {
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private CategoryRepository categoryRepository;

    public DiamondCasingDTO toDto(DiamondCasing diamondCasing) {
        if (diamondCasing == null) {
            return null;
        }
        DiamondCasingDTO diamondCasingDTO = new DiamondCasingDTO();
        diamondCasingDTO.setId(diamondCasing.getId());
        diamondCasingDTO.setMaterial(diamondCasing.getMaterial());
        diamondCasingDTO.setPrice(diamondCasing.getPrice());
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
        return diamondCasing;
    }

    public List<DiamondCasingDTO> toDtoList(List<DiamondCasing> diamondCasings) {
        return diamondCasings.stream().map(this::toDto).collect(Collectors.toList());
    }
}
