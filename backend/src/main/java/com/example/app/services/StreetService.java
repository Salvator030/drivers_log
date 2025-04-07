package com.example.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Street;
import com.example.app.models.StreetDto;
import com.example.app.repositorys.StreetRepository;

@Service
public class StreetService {
    
    @Autowired
    private StreetRepository streetRepository;
    
   private StreetDto convertToDto(Street street) {
        StreetDto streetDto = new StreetDto();
        streetDto.setStreetId(street.getStreetId());
        streetDto.setName(street.getStreetName());
        return streetDto;
    }
  
    public List<StreetDto> getAllStreets() {
        List <Street> streets = streetRepository.findAll();
        return streets.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

 

}


