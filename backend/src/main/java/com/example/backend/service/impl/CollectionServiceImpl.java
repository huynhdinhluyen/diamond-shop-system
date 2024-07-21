package com.example.backend.service.impl;

import com.example.backend.dto.CollectionDTO;
import com.example.backend.entity.Collections;
import com.example.backend.entity.Product;
import com.example.backend.mapper.CollectionMapper;
import com.example.backend.repository.CollectionRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CollectionMapper collectionMapper;

    @Override
    public CollectionDTO createCollection(CollectionDTO collectionDTO) {
        Collections collection = new Collections();
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());

        List<Product> products = collectionDTO.getProductIds().stream()
                .map(productId -> productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Product not found: " + productId)))
                .collect(Collectors.toList());
        collection.setProducts(products);

        Collections savedCollection = collectionRepository.save(collection);
        return collectionMapper.convertToDTO(savedCollection);
    }

    @Transactional
    @Override
    public CollectionDTO getCollectionById(Integer id) {
        Collections collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found: " + id));
        return collectionMapper.convertToDTO(collection);
    }

    @Override
    public CollectionDTO updateCollection(Integer id, CollectionDTO collectionDTO) {
        Collections collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found: " + id));
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());

        List<Product> products = collectionDTO.getProductIds().stream()
                .map(productId -> productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Product not found: " + productId)))
                .collect(Collectors.toList());
        collection.setProducts(products);

        Collections updatedCollection = collectionRepository.save(collection);
        return collectionMapper.convertToDTO(updatedCollection);
    }

    @Override
    public void deleteCollection(Integer id) {
        Collections collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found: " + id));
        collectionRepository.delete(collection);
    }

    @Transactional
    @Override
    public List<CollectionDTO> getAllCollections() {
        return collectionRepository.findAll().stream()
                .map(collectionMapper::convertToDTO)
                .collect(Collectors.toList());
    }
}
