package com.example.backend.mapper;

import com.example.backend.dto.NecklaceSizeDTO;
import com.example.backend.entity.NecklaceSize;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class NecklaceSizeMapper {
    public NecklaceSizeDTO toDto(NecklaceSize entity) {
        return new NecklaceSizeDTO(entity.getId(), entity.getName(), entity.getLength());
    }

    public NecklaceSize toEntity(NecklaceSizeDTO dto) {
        return new NecklaceSize(dto.getId(), dto.getName(), dto.getLength(), null);
    }

    public List<NecklaceSizeDTO> toDtoList(List<NecklaceSize> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<NecklaceSize> toEntityList(List<NecklaceSizeDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
