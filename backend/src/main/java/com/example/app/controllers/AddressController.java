package com.example.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.AddressDTO;
import com.example.app.services.AddressService;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("*")
public class AddressController {

    @Autowired
    AddressService addressService;

    @RequestMapping("/getAll")
    public ResponseEntity<List<AddressDTO>> getAllAddresses() {
        List<AddressDTO> addresses = addressService.getAllAddresses();
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/create")
    public ResponseEntity<AddressDTO> createAddress(
            @RequestBody AddressDTO addressDTO
    ) {
        AddressDTO createdAddress = addressService.createAddress(addressDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201 für "Created"
                .body(createdAddress); // Sendet DTO mit ID zurück
    }

}
