package com.example.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.StreetDto;
import com.example.app.services.StreetService;


@RestController
@RequestMapping("/api/street")

public class StreetController {

    @Autowired
    private StreetService streetService;
    
    @RequestMapping("/getAll")
    public ResponseEntity<List<StreetDto>> getAllStreets() {
        List<StreetDto> streets = streetService.getAllStreets();
        return ResponseEntity.ok(streets);
    }
    
   
    
}
