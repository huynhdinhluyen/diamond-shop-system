package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Integer id;
    private String name;
    private String imageUrl;
    private List<RingSizeDTO> ringSizes;
    private List<NecklaceSizeDTO> necklaceSizes;
    private List<BraceletSizeDTO> braceletSizes;
}
