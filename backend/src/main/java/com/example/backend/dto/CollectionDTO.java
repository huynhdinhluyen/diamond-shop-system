package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CollectionDTO {
    private Integer id;
    private String name;
    private String description;
    private List<Integer> productIds = new ArrayList<>();
}