package com.example.app.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.DrivenRouteDto;
import com.example.app.repositorys.DrivenRoureRepository;
import com.example.app.services.DrivenRouteServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/drivenroute")
public class DrivenRouteController {

    @Autowired
    private DrivenRouteServices drivenRouteServices;

    @PostMapping("/create")
    public ResponseEntity<DrivenRouteDto> createDrivenRoute(@RequestBody DrivenRouteDto dto) {
        DrivenRouteDto createdDrivenRoute = drivenRouteServices.createDrivenRoute(dto);
        System.out.println("DrivenRouteDto :" + createdDrivenRoute);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDrivenRoute);
    }

    @PostMapping("/month")
    public ResponseEntity< List<DrivenRouteDto>> getDrivenRoutesInMonth(@RequestBody LocalDate date) {
        List<DrivenRouteDto> drivenRoutes = drivenRouteServices.getStreckenInMonat(date);
        System.out.println("IM MONAT :" + drivenRoutes);
        return ResponseEntity.status(HttpStatus.CREATED).body(drivenRoutes);
    }

}
