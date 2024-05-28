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
        DiamondDTO diamondDTO = new DiamondDTO();
        BeanUtils.copyProperties(diamond, diamondDTO);
        return diamondDTO;
    }

    public Diamond toEntity(DiamondDTO diamondDTO) {
        if (diamondDTO == null) {
            return null;
        }

        Diamond diamond = new Diamond();
        BeanUtils.copyProperties(diamondDTO, diamond);
        return diamond;
    }
}
