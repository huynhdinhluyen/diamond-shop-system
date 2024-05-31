package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WarrantyDTO {
    private Integer id;
    private String warrantyFree;
    private String warrantyPaid;
    private String warrantyExcluded;
    private LocalDate warrantyStartDate;
    private LocalDate warrantyEndDate;
    private CategoryDTO category;
}
