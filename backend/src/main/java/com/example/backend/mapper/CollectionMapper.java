package com.example.backend.mapper;

import com.example.backend.dto.CollectionDTO;
import com.example.backend.entity.Collections;
import com.example.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CollectionMapper {
    public CollectionDTO convertToDTO(Collections collection) {
        CollectionDTO collectionDTO = new CollectionDTO();
        collectionDTO.setId(collection.getId());
        collectionDTO.setName(collection.getName());
        collectionDTO.setDescription(collection.getDescription());
        collectionDTO.setProductIds(collection.getProducts().stream()
                .map(Product::getId)
                .collect(Collectors.toList()));
        return collectionDTO;
    }
}
