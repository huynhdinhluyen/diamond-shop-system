package com.example.backend.mapper;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.RingSize;
import com.example.backend.entity.NecklaceSize;
import com.example.backend.entity.BraceletSize;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {
    private final RingSizeMapper ringSizeMapper;
    private final NecklaceSizeMapper necklaceSizeMapper;
    private final BraceletSizeMapper braceletSizeMapper;

    public CategoryMapper(@Lazy RingSizeMapper ringSizeMapper, @Lazy NecklaceSizeMapper necklaceSizeMapper, @Lazy BraceletSizeMapper braceletSizeMapper) {
        this.ringSizeMapper = ringSizeMapper;
        this.necklaceSizeMapper = necklaceSizeMapper;
        this.braceletSizeMapper = braceletSizeMapper;
    }

    public CategoryDTO toDto(Category entity) {
        if (entity == null) {
            return null;
        }

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(entity.getId());
        categoryDTO.setName(entity.getName());
        categoryDTO.setImageUrl(entity.getImageUrl());

        if (entity.getRingSizes() != null) {
            categoryDTO.setRingSizes(ringSizeMapper.toDtoList(entity.getRingSizes()));
        }

        if (entity.getNecklaceSizes() != null) {
            categoryDTO.setNecklaceSizes(necklaceSizeMapper.toDtoList(entity.getNecklaceSizes()));
        }

        if (entity.getBraceletSizes() != null) {
            categoryDTO.setBraceletSizes(braceletSizeMapper.toDtoList(entity.getBraceletSizes()));
        }

        return categoryDTO;
    }

    public Category toEntity(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }

        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        category.setImageUrl(categoryDTO.getImageUrl());

        if (categoryDTO.getRingSizes() != null) {
            List<RingSize> ringSizes = ringSizeMapper.toEntityList(categoryDTO.getRingSizes());
            ringSizes.forEach(ringSize -> ringSize.setCategory(category));
            category.setRingSizes(ringSizes);
        }

        if (categoryDTO.getNecklaceSizes() != null) {
            List<NecklaceSize> necklaceSizes = necklaceSizeMapper.toEntityList(categoryDTO.getNecklaceSizes());
            necklaceSizes.forEach(necklaceSize -> necklaceSize.setCategory(category));
            category.setNecklaceSizes(necklaceSizes);
        }

        if (categoryDTO.getBraceletSizes() != null) {
            List<BraceletSize> braceletSizes = braceletSizeMapper.toEntityList(categoryDTO.getBraceletSizes());
            braceletSizes.forEach(braceletSize -> braceletSize.setCategory(category));
            category.setBraceletSizes(braceletSizes);
        }

        return category;
    }

    public List<CategoryDTO> toDtoList(List<Category> categories) {
        return categories.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Category> toEntityList(List<CategoryDTO> categoryDTOs) {
        return categoryDTOs.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}
