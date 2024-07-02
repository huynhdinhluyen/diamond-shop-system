package com.example.backend.mapper;

import com.example.backend.dto.MembershipLevelDTO;
import com.example.backend.entity.MembershipLevel;
import org.springframework.stereotype.Component;

@Component
public class MembershipLevelMapper {
    public MembershipLevelDTO toMembershipLevelDTO(MembershipLevel membershipLevel) {
        if (membershipLevel == null) {
            return null;
        }
        MembershipLevelDTO membershipLevelDTO = new MembershipLevelDTO();
        membershipLevelDTO.setId(membershipLevel.getId());
        membershipLevelDTO.setName(membershipLevel.getName());
        membershipLevelDTO.setMinPoints(membershipLevel.getMinPoints());
        membershipLevelDTO.setMaxPoints(membershipLevel.getMaxPoints());
        membershipLevelDTO.setDiscountRate(membershipLevel.getDiscountRate());
        return membershipLevelDTO;
    }

    public MembershipLevel toMembershipLevelEntity(MembershipLevelDTO membershipLevelDTO) {
        if (membershipLevelDTO == null) {
            return null;
        }
        MembershipLevel membershipLevel = new MembershipLevel();
        membershipLevel.setId(membershipLevelDTO.getId());
        membershipLevel.setName(membershipLevelDTO.getName());
        membershipLevel.setMinPoints(membershipLevelDTO.getMinPoints());
        membershipLevel.setMaxPoints(membershipLevelDTO.getMaxPoints());
        membershipLevel.setDiscountRate(membershipLevelDTO.getDiscountRate());
        return membershipLevel;
    }
}
