package com.example.backend.serviceImplementation;

import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;

import java.util.List;

public class CategoryServiceImp implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }


}
