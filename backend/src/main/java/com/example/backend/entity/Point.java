package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "point")
public class Point {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "points", nullable = false)
    private Long points;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private User customer;

}