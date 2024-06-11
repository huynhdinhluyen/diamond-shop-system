package com.example.backend.service.impl;

import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.entity.Size;
import com.example.backend.exception.DiamondCasingNotFoundException;
import com.example.backend.mapper.DiamondCasingMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.DiamondCasingRepository;
import com.example.backend.repository.SizeRepository;
import com.example.backend.service.DiamondCasingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiamondCasingServiceImpl implements DiamondCasingService {
    private final DiamondCasingRepository diamondCasingRepository;
    private final DiamondCasingMapper diamondCasingMapper;
    private final CategoryRepository categoryRepository;
    private final SizeRepository sizeRepository;
    @Override
    @Transactional(readOnly = true)
    public List<DiamondCasingDTO> getDiamondCasings() {
        List<DiamondCasing> diamondCasings = diamondCasingRepository.findAll();
        return diamondCasingMapper.toDtoList(diamondCasings);
    }

    @Override
    @Transactional
    public DiamondCasingDTO createDiamondCasing(DiamondCasingDTO diamondCasingDTO) {
        if (diamondCasingDTO == null) {
            throw new IllegalArgumentException("DiamondCasingDTO cannot be null");
        }
        if (diamondCasingDTO.getMaterial() == null || diamondCasingDTO.getMaterial().isEmpty()) {
            throw new IllegalArgumentException("Material is required");
        }
        if (diamondCasingDTO.getPrice() == null || diamondCasingDTO.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be a positive number");
        }
        if (diamondCasingDTO.getCategory() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }
        if (diamondCasingDTO.getSize() == null) {
            throw new IllegalArgumentException("Size ID is required");
        }

        // Kiểm tra xem danh mục (category) có tồn tại không
        Category category = categoryRepository.findById(diamondCasingDTO.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Kiểm tra xem kích thước (size) có tồn tại không
        Size size = sizeRepository.findById(diamondCasingDTO.getSize().getId())
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Tạo đối tượng DiamondCasing từ DTO
        DiamondCasing diamondCasing = new DiamondCasing();
        diamondCasing.setMaterial(diamondCasingDTO.getMaterial());
        diamondCasing.setPrice(diamondCasingDTO.getPrice());
        diamondCasing.setCategory(category);
        diamondCasing.setSize(size);

        // Lưu vỏ kim cương vào cơ sở dữ liệu
        DiamondCasing savedDiamondCasing = diamondCasingRepository.save(diamondCasing);

        // Trả về DiamondCasingDTO
        return diamondCasingMapper.toDto(savedDiamondCasing);
    }

    @Override
    @Transactional
    public DiamondCasingDTO updateDiamondCasing(Integer id, DiamondCasingDTO diamondCasingDTO) throws DiamondCasingNotFoundException{
        DiamondCasing existingDiamondCasing = diamondCasingRepository.findById(id)
                .orElseThrow(() -> new DiamondCasingNotFoundException(id));

        // Validate dữ liệu đầu vào (diamondCasingDTO)
        if (diamondCasingDTO == null) {
            throw new IllegalArgumentException("DiamondCasingDTO cannot be null");
        }
        if (diamondCasingDTO.getMaterial() == null || diamondCasingDTO.getMaterial().isEmpty()) {
            throw new IllegalArgumentException("Material is required");
        }
        if (diamondCasingDTO.getPrice() == null || diamondCasingDTO.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be a positive number");
        }
        if (diamondCasingDTO.getCategory() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }
        if (diamondCasingDTO.getSize() == null) {
            throw new IllegalArgumentException("Size ID is required");
        }

        // Kiểm tra xem danh mục (category) có tồn tại không
        Category category = categoryRepository.findById(diamondCasingDTO.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Kiểm tra xem kích thước (size) có tồn tại không
        Size size = sizeRepository.findById(diamondCasingDTO.getSize().getId())
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Cập nhật thông tin vỏ kim cương từ DTO
        existingDiamondCasing.setMaterial(diamondCasingDTO.getMaterial());
        existingDiamondCasing.setPrice(diamondCasingDTO.getPrice());
        existingDiamondCasing.setCategory(category);
        existingDiamondCasing.setSize(size);

        DiamondCasing updatedDiamondCasing = diamondCasingRepository.save(existingDiamondCasing);

        // Trả về DiamondCasingDTO đã cập nhật
        return diamondCasingMapper.toDto(updatedDiamondCasing);
    }

    @Override
    @Transactional
    public void deleteDiamondCasing(Integer id) throws DiamondCasingNotFoundException {
        if (!diamondCasingRepository.existsById(id)) {
            throw new DiamondCasingNotFoundException(id);
        }
        diamondCasingRepository.deleteById(id);
    }
}
