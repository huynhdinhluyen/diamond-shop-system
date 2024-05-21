package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;


@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ProductDiamondId implements Serializable {

    @Column(name = "product_id", nullable = false)
    private Integer productId;

    @Column(name = "diamond_id", nullable = false)
    private Integer diamondId;

}