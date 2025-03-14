package com.moneybot.service;

import com.moneybot.model.Category;
import com.moneybot.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll(); // Fetch all categories
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}
