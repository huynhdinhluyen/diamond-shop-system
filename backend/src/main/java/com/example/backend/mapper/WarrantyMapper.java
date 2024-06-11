package com.example.backend.mapper;

import com.example.backend.dto.WarrantyDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.Warranty;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class WarrantyMapper {
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private CategoryRepository categoryRepository;

    public WarrantyDTO toDto(Warranty warranty) {
        if (warranty == null) {
            return null;
        }
        return new WarrantyDTO(
                warranty.getId(),
                warranty.getWarrantyFree(),
                warranty.getWarrantyPaid(),
                warranty.getWarrantyExcluded(),
                warranty.getWarrantyStartDate(),
                warranty.getWarrantyEndDate(),
                Optional.ofNullable(warranty.getCategory())
                        .map(categoryMapper::toDto)
                        .orElseThrow(() -> new CategoryNotFoundException(warranty.getCategory().getId())) // Ném ra CategoryNotFoundException nếu không tìm thấy category
        );
    }

    public Warranty toEntity(WarrantyDTO warrantyDTO) {
        if (warrantyDTO == null) {
            return null;
        }
        Warranty warranty = new Warranty();
        warranty.setId(warrantyDTO.getId());
        warranty.setWarrantyFree(warrantyDTO.getWarrantyFree());
        warranty.setWarrantyPaid(warrantyDTO.getWarrantyPaid());
        warranty.setWarrantyExcluded(warrantyDTO.getWarrantyExcluded());
        warranty.setWarrantyStartDate(warrantyDTO.getWarrantyStartDate());
        warranty.setWarrantyEndDate(warrantyDTO.getWarrantyEndDate());
        if (warrantyDTO.getCategory() != null) {
            Category category = categoryRepository.findById(warrantyDTO.getCategory().getId())
                    .orElseThrow(() -> new CategoryNotFoundException(warrantyDTO.getCategory().getId()));
            warranty.setCategory(category);
        }
        return warranty;
    }

    public List<WarrantyDTO> toDtoList(List<Warranty> warranties) {
        return warranties.stream().map(this::toDto).collect(Collectors.toList());
    }
}
