package com.example.backend.service.impl;

import com.example.backend.dto.TransactionDTO;
import com.example.backend.entity.Transaction;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Override
    public TransactionDTO getTransactionById(Integer id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return convertToDto(transaction);
    }

    private TransactionDTO convertToDto(Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setId(transaction.getId());
        transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
        transactionDTO.setTransactionDate(transaction.getTransactionDate());
        transactionDTO.setTransactionAmount(transaction.getTransactionAmount());
        transactionDTO.setStatus(transaction.getStatus());
        return transactionDTO;
    }
}
