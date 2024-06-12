package com.example.backend.mapper;

import com.example.backend.dto.DiamondDTO;
import com.example.backend.entity.Diamond;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class DiamondMapper {
    public DiamondDTO toDto(Diamond diamond) {
        if (diamond == null) {
            return null;
        }
        return new DiamondDTO(diamond.getId(),
                diamond.getColor(),
                diamond.getOrigin(),
                diamond.getCaratWeight(),
                diamond.getCutType(),
                diamond.getClarity(),
                diamond.getGiaCertificate(),
                diamond.getPrice());
    }

    public Diamond toEntity(DiamondDTO diamondDTO) {
        if (diamondDTO == null) {
            return null;
        }
        return new Diamond(
                diamondDTO.getId(),
                diamondDTO.getColor(),
                diamondDTO.getOrigin(),
                diamondDTO.getCaratWeight(),
                diamondDTO.getCutType(),
                diamondDTO.getClarity(),
                diamondDTO.getGiaCertificate(),
                diamondDTO.getPrice()
        );
    }
}
