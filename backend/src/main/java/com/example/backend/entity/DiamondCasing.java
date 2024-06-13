package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "diamond_casing")
public class DiamondCasing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "material", nullable = false, length = 50)
    private String material;

    @Column(name = "price", nullable = false)
    private Long price = 0L;

    @OneToMany(mappedBy = "diamondCasing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;
}