package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.validation.constraints.AssertTrue;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "warranty")
public class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "warranty_free", nullable = false)
    private String warrantyFree;

    @Lob
    @Column(name = "warranty_paid", nullable = false)
    private String warrantyPaid;

    @Lob
    @Column(name = "warranty_excluded", nullable = false)
    private String warrantyExcluded;

    @Column(name = "warranty_start_date")
    private LocalDate warrantyStartDate;

    @Column(name = "warranty_end_date")
    private LocalDate warrantyEndDate;

    @AssertTrue(message = "Warranty start date must be before warranty end date")
    public boolean isValidDateRange() {
        return warrantyStartDate.isBefore(warrantyEndDate) || warrantyStartDate.isEqual(warrantyEndDate);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "category_id")
    private Category category;

}