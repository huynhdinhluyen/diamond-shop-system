package com.example.backend.mapper;

import com.example.backend.dto.TransactionDTO;
import com.example.backend.entity.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {
    public TransactionDTO convertToTransactionDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
        transactionDTO.setTransactionDate(transaction.getTransactionDate());
        transactionDTO.setTransactionAmount(transaction.getTransactionAmount());
        transactionDTO.setStatus(transaction.getStatus());
        return transactionDTO;
    }
}
