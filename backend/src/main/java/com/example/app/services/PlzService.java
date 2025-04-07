package com.example.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Plz;
import com.example.app.models.PlzDto;
import com.example.app.repositorys.PlzRepository;

@Service
public class PlzService {

    @Autowired
    private PlzRepository plzRepository;

    private PlzDto convertToDto(Plz plz) {
        PlzDto plzDto = new PlzDto();
        plzDto.setPlzId(plz.getPlzId());
        plzDto.setName(plz.getPlz());
        return plzDto;
    }
    
    public List<PlzDto> getAllPlzs() {
        List<Plz> plzs = plzRepository.findAll();
        return plzs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
}
