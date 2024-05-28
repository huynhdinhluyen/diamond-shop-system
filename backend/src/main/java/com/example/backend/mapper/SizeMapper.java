package com.example.backend.mapper;
import com.example.backend.dto.SizeDTO;
import com.example.backend.entity.Size;
import org.springframework.stereotype.Component;

@Component
public class SizeMapper {
    public SizeDTO toDto(Size entity) {
        if (entity == null) {
            return null;
        }
        return new SizeDTO(entity.getId(), entity.getName(), entity.getDiameter());
    }

    public Size toEntity(SizeDTO sizeDTO) {
        if (sizeDTO == null) {
            return null;
        }
        Size size = new Size();
        size.setId(sizeDTO.getId());
        size.setName(sizeDTO.getName());
        size.setDiameter(sizeDTO.getDiameter());
        return size;
    }
}
