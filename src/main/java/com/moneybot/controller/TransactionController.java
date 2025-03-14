package com.moneybot.controller;

import com.moneybot.model.Transaction;
import com.moneybot.model.Category;
import com.moneybot.repository.CategoryRepository;
import com.moneybot.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;
    private final CategoryRepository categoryRepository;

    public TransactionController(TransactionService transactionService, CategoryRepository categoryRepository) {
        this.transactionService = transactionService;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        if (transaction.getAmount() == null) {
            throw new IllegalArgumentException("Amount cannot be null.");
        }

        Optional<Category> category = categoryRepository.findById(transaction.getCategory().getId());
        category.ifPresent(transaction::setCategory);

        return transactionService.saveTransaction(transaction);
    }
}