package com.example.backend.controller;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.exception.DiamondNotFoundException;
import com.example.backend.service.DiamondService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diamonds")
@RequiredArgsConstructor
public class DiamondController {
    private final DiamondService diamondService;

    @GetMapping
    public ResponseEntity<List<DiamondDTO>> getAllDiamonds() {
        List<DiamondDTO> diamonds = diamondService.getAllDiamonds();
        return ResponseEntity.ok(diamonds);
    }

    @PostMapping
    public ResponseEntity<DiamondDTO> createDiamond(@RequestBody DiamondDTO diamond) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diamondService.createDiamond(diamond));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiamondDTO> updateDiamond(@PathVariable Integer id, @RequestBody DiamondDTO diamond) {
        try {
            return ResponseEntity.ok(diamondService.updateDiamond(id, diamond));
        } catch (DiamondNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiamond(@PathVariable Integer id) {
        try {
            diamondService.deleteDiamond(id);
            return ResponseEntity.noContent().build();
        } catch (DiamondNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
