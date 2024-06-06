package com.example.backend.controller;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(categoryService.getCategoryById(id));
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryDTO)); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Integer id, @Valid @RequestBody CategoryDTO categoryDTO) {
        try {
            return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (CategoryNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}
