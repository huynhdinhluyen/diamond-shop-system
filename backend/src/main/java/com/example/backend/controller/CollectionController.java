package com.example.backend.controller;

import com.example.backend.dto.CollectionDTO;
import com.example.backend.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @PostMapping("/add")
    public ResponseEntity<CollectionDTO> createCollection(@RequestBody CollectionDTO collectionDTO) {
        CollectionDTO createdCollection = collectionService.createCollection(collectionDTO);
        return ResponseEntity.ok(createdCollection);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionDTO> getCollectionById(@PathVariable Integer id) {
        CollectionDTO collectionDTO = collectionService.getCollectionById(id);
        return ResponseEntity.ok(collectionDTO);
    }

    @GetMapping
    public ResponseEntity<List<CollectionDTO>> getAllCollections() {
        List<CollectionDTO> collections = collectionService.getAllCollections();
        return ResponseEntity.ok(collections);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CollectionDTO> updateCollection(@PathVariable Integer id, @RequestBody CollectionDTO collectionDTO) {
        CollectionDTO updatedCollection = collectionService.updateCollection(id, collectionDTO);
        return ResponseEntity.ok(updatedCollection);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Integer id) {
        collectionService.deleteCollection(id);
        return ResponseEntity.noContent().build();
    }
}