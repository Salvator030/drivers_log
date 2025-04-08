package com.example.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Place;
import com.example.app.models.PlaceDto;
import com.example.app.repositorys.PlaceRepository;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    private PlaceDto convertToDto(Place place) {
        PlaceDto placeDto = new PlaceDto();
        placeDto.setPlaceId(place.getPlaceId());
        placeDto.setName(place.getName());
        return placeDto;
    }

    public List<PlaceDto> getAllPlaces() {
        List<Place> places = placeRepository.findAll();
        return places.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
}
