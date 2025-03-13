package com.moneybot.controller;

import com.moneybot.dto.TransactionDTO;
import com.moneybot.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moneybot/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public String addTransaction(@RequestBody TransactionDTO transactionDTO) {
        transactionService.saveTransaction(transactionDTO);
        return "Transaction added successfully!";
    }
}

