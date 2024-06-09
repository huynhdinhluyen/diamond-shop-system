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
        return new DiamondCasingDTO(
                diamondCasing.getId(),
                diamondCasing.getMaterial(),
                diamondCasing.getPrice(),
                Optional.ofNullable(diamondCasing.getCategory()).map(categoryMapper::toDto).orElse(null),
                Optional.ofNullable(diamondCasing.getSize()).map(sizeMapper::toDto).orElse(null)
        );
    }

    public DiamondCasing toEntity(DiamondCasingDTO diamondCasingDTO) {
        if (diamondCasingDTO == null) {
            return null;
        }
        DiamondCasing diamondCasing = new DiamondCasing();
        diamondCasing.setId(diamondCasingDTO.getId());
        diamondCasing.setMaterial(diamondCasingDTO.getMaterial());
        diamondCasing.setPrice(diamondCasingDTO.getPrice());
        Category category = diamondCasingDTO.getCategory() != null ? categoryRepository.findById(diamondCasingDTO.getCategory().getId())
                .orElseThrow(() -> new CategoryNotFoundException(diamondCasingDTO.getCategory().getId()))
                : null;
        diamondCasing.setCategory(category);
        Size size = diamondCasingDTO.getSize() != null ? sizeRepository.findById(diamondCasingDTO.getSize().getId())
                .orElseThrow(() -> new SizeNotFoundException(diamondCasingDTO.getSize().getId()))
                : null;
        diamondCasing.setSize(size);
        return diamondCasing;
    }

    public List<DiamondCasingDTO> toDtoList(List<DiamondCasing> diamondCasings) {
        return diamondCasings.stream().map(this::toDto).collect(Collectors.toList());
    }
}
