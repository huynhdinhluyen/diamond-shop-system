package com.example.backend.mapper;

import com.example.backend.dto.RingSizeDTO;
import com.example.backend.entity.RingSize;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RingSizeMapper {
    public RingSizeDTO toDto(RingSize entity) {
        return new RingSizeDTO(entity.getId(), entity.getName(), entity.getDiameter());
    }

    public RingSize toEntity(RingSizeDTO dto) {
        return new RingSize(dto.getId(), dto.getName(), dto.getDiameter(), null);
    }

    public List<RingSizeDTO> toDtoList(List<RingSize> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<RingSize> toEntityList(List<RingSizeDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
