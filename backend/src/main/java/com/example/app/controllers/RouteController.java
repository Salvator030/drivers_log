package com.example.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.AddressDTO;
import com.example.app.models.Route;
import com.example.app.models.RouteDto;
import com.example.app.services.RouteService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/route")
@CrossOrigin("*")
public class RouteController {

    @Autowired
    RouteService routeService;

    @GetMapping("/getAll")
    public ResponseEntity<List<RouteDto>> getAllRoutes() {
        List<RouteDto> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    @PostMapping("/create")
    public ResponseEntity<RouteDto> createRoute(@RequestBody RouteDto routeDTO) {
        RouteDto createdRoute = routeService.createRoute(routeDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201 für "Created"
                .body(createdRoute); // Sendet DTO mit ID zurück
    }

}
