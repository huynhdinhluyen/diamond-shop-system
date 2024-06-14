package com.example.backend.mapper;

import com.example.backend.dto.BraceletSizeDTO;
import com.example.backend.entity.BraceletSize;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BraceletSizeMapper {
    public BraceletSizeDTO toDto(BraceletSize entity) {
        return new BraceletSizeDTO(entity.getId(), entity.getName(), entity.getDiameter());
    }

    public BraceletSize toEntity(BraceletSizeDTO dto) {
        return new BraceletSize(dto.getId(), dto.getName(), dto.getDiameter(), null);
    }

    public List<BraceletSizeDTO> toDtoList(List<BraceletSize> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<BraceletSize> toEntityList(List<BraceletSizeDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
