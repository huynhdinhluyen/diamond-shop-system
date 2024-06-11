package com.example.backend.controller;

import com.example.backend.dto.DiamondCasingDTO;
import com.example.backend.exception.DiamondCasingNotFoundException;
import com.example.backend.service.DiamondCasingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diamond-casings")
@RequiredArgsConstructor
public class DiamondCasingController {
    private final DiamondCasingService diamondCasingService;

    @GetMapping
    public ResponseEntity<List<DiamondCasingDTO>> getAllDiamondCasings() {
        return ResponseEntity.ok(diamondCasingService.getDiamondCasings());
    }

    @PostMapping
    public ResponseEntity<DiamondCasingDTO> createDiamondCasing(@RequestBody DiamondCasingDTO diamondCasingDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diamondCasingService.createDiamondCasing(diamondCasingDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiamondCasingDTO> updateDiamondCasing(@PathVariable Integer id, @RequestBody DiamondCasingDTO diamondCasingDTO) {
        try {
            return ResponseEntity.ok(diamondCasingService.updateDiamondCasing(id, diamondCasingDTO));
        } catch (DiamondCasingNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DiamondCasingDTO> deleteDiamondCasing(@PathVariable Integer id) {
        try {
            diamondCasingService.deleteDiamondCasing(id);
            return ResponseEntity.ok().build();
        } catch (DiamondCasingNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
