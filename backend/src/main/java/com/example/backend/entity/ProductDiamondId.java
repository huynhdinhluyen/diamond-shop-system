package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProductDiamondId entity = (ProductDiamondId) o;
        return Objects.equals(this.productId, entity.productId) &&
                Objects.equals(this.diamondId, entity.diamondId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, diamondId);
    }
}