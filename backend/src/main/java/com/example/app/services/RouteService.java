package com.example.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Address;
import com.example.app.models.AddressDTO;
import com.example.app.models.Route;
import com.example.app.models.RouteDto;
import com.example.app.repositorys.AddressRepository;
import com.example.app.repositorys.RouteRepository;

@Service
public class RouteService {

    @Autowired
    RouteRepository routeRepository;

    @Autowired
    AddressRepository addressRepository;

    public Route create(Route body) {
        return routeRepository.save(body);
    }

    public Route getRouteById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    public void deleteRouteById(Long id) {
        routeRepository.deleteById(id);
    }

    public List<RouteDto> getAllRoutes() {
        List<Route> routes = routeRepository.findAll();
        return routes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RouteDto convertToDTO(Route route) {
        RouteDto dto = new RouteDto();
        dto.setRouteId(route.getRouteId());

        dto.setStartAddressId(route.getStartAddress().getAddressId());
        dto.setEndAddressId(route.getDestinationAddress().getAddressId());
        dto.setDistance(route.getDistance());
       

        return dto;
    }

    public Route convertToEtentity(RouteDto routeDTO) {

        Address startAddress = addressRepository.findById(routeDTO.getStartAddressId())
        .orElseThrow(() -> new RuntimeException("Startadresse nicht gefunden"));

    Address destinationAddress = addressRepository.findById(routeDTO.getEndAddressId())
        .orElseThrow(() -> new RuntimeException("Zieladresse nicht gefunden"));
        Route route = new Route();
        route.setStartAddress(startAddress);
        route.setDestinationAddress(destinationAddress);

        route.setDistance(routeDTO.getDistance());

        return route;
    }
    public RouteDto createRoute(RouteDto routeDTO) {
        Route route = convertToEtentity(routeDTO); // Konvertiere DTO → Entity
        Route savedRoute = routeRepository.save(route);
        return convertToDTO(savedRoute); // Konvertiere Entity → DTO mit ID
    }
}
