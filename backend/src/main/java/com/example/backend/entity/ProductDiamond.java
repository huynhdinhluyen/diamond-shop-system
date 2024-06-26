package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "product_diamonds")
public class ProductDiamond {
    @EmbeddedId
    private ProductDiamondId id;

    @MapsId("productId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @MapsId("diamondId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "diamond_id", nullable = false)
    private Diamond diamond;

    @Column(name = "is_main", nullable = false)
    private Boolean isMain = false;

    public ProductDiamond(Product product, Diamond diamond, boolean isMain) {
        this.product = product;
        this.diamond = diamond;
        this.isMain = isMain;
        this.id = new ProductDiamondId(product.getId(), diamond.getId());
    }
}