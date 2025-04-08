package com.example.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.PlzDto;
import com.example.app.services.PlzService;

@RestController
@RequestMapping("/api/plz")
public class PlzController {

    @Autowired
    private PlzService plzService;
    
    @GetMapping("/getAll")
    public ResponseEntity<List<PlzDto>> getAllPlzs() {
        List<PlzDto> plzs = plzService.getAllPlzs();
        return ResponseEntity.ok(plzs);
    }
    
}
