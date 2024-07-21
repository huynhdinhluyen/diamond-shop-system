package com.example.backend.service;

import com.example.backend.dto.CollectionDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CollectionService {
    CollectionDTO createCollection(CollectionDTO collectionDTO);
    CollectionDTO getCollectionById(Integer id);
    CollectionDTO updateCollection(Integer id, CollectionDTO collectionDTO);
    void deleteCollection(Integer id);
    List<CollectionDTO> getAllCollections();
}
