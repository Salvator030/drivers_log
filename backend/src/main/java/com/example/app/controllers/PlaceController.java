package com.example.app.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.PlaceDto;
import com.example.app.services.PlaceService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@RestController
@RequestMapping("/api/place")

public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/getAll")
    public ResponseEntity<List<PlaceDto>> getAllPlaces() {
        List<PlaceDto> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }
    
}
