package com.example.backend.serviceImplementation;

import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImp implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }


}
