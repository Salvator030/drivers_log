package com.example.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Address;
import com.example.app.models.AddressDTO;
import com.example.app.services.AddressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/address")

public class AddressController {

    @Autowired  
    AddressService addressService;
    
    @PostMapping("/create")
    public Address postMethodName(@RequestBody AddressDTO entity) {
        return addressService.create(entity);
    }
    
}
