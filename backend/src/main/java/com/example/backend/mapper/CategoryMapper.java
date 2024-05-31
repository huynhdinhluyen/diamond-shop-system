package com.example.backend.mapper;
import com.example.backend.dto.CategoryDTO;
import com.example.backend.entity.Category;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {
    public CategoryDTO toDto(Category entity) {
        if (entity == null) {
            return null;
        }
        return new CategoryDTO(entity.getId(), entity.getName(), entity.getImageUrl());
    }
    public Category toEntity(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        category.setImageUrl(categoryDTO.getImageUrl());
        return category;
    }
    public List<CategoryDTO> toDtoList(List<Category> categories) {
        return categories.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    public List<Category> toEntityList(List<CategoryDTO> categoryDTOs) {
        return categoryDTOs.stream()
                .filter(Objects::nonNull) // Loại bỏ các phần tử null trong danh sách
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}
