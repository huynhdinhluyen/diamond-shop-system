package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import javax.validation.constraints.Min;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @Min(value = 0, message = "Price must be a positive number")
    @Column(name = "price", nullable = false)
    private Long price = 0L;

    @OneToMany(mappedBy = "diamondCasing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;
}