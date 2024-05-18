package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "\"transaction\"")
public class Transaction {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "transaction_date", nullable = false)
    private Instant transactionDate;

    @Column(name = "transaction_amount", nullable = false)
    private Long transactionAmount;

    @Nationalized
    @Column(name = "status", nullable = false, length = 25)
    private String status;

}