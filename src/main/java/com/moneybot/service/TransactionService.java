package com.moneybot.service;

import com.moneybot.model.Category;
import com.moneybot.model.Transaction;
import com.moneybot.repository.CategoryRepository;
import com.moneybot.repository.TransactionRepository;
import com.moneybot.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
    }

    public void saveTransaction(TransactionDTO transactionDTO) {
        Category category = categoryRepository.findByName(transactionDTO.getCategoryName());
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        Transaction transaction = new Transaction(transactionDTO.getAmount(), transactionDTO.getTransactionDate(), transactionDTO.getDescription(), category);

        transactionRepository.save(transaction);
    }
}

