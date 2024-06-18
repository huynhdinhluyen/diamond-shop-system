package com.example.backend.service;

import com.example.backend.dto.TransactionDTO;
import org.springframework.stereotype.Service;

@Service
public interface TransactionService {
    TransactionDTO getTransactionById(Integer id);
}
