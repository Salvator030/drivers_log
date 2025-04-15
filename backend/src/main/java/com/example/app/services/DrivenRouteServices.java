package com.example.app.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.DrivenRoute;
import com.example.app.models.DrivenRouteDto;
import com.example.app.models.Route;
import com.example.app.repositorys.DrivenRoureRepository;
import com.example.app.repositorys.RouteRepository;

@Service
public class DrivenRouteServices {

    @Autowired
    DrivenRoureRepository drivenRoureRepository;

    @Autowired
    RouteRepository routeRepository;

    private DrivenRoute convertToEntity(DrivenRouteDto drivenRouteDto) {
        Optional<Route> route = routeRepository.findById(drivenRouteDto.getRouteId());
        DrivenRoute entity = new DrivenRoute();
        entity.setDate(drivenRouteDto.getDate());
        entity.setRoute(route.get());
        return entity;
    }

    private DrivenRouteDto convertToDto(DrivenRoute dRoute) {
        return new DrivenRouteDto(dRoute.getDrivenRouteId(), dRoute.getRoute().getRouteId(), dRoute.getDate());

    }

    public DrivenRouteDto createDrivenRoute(DrivenRouteDto drivenRouteDto) {
        DrivenRoute entity = convertToEntity(drivenRouteDto);
        entity = drivenRoureRepository.save(entity);

        return convertToDto(entity);
    }

    public List<DrivenRouteDto> getStreckenInMonat(LocalDate date) {
        // Ersten Tag des Monats (00:00:00)
        LocalDateTime startOfMonth = date.withDayOfMonth(1).atStartOfDay();
        // Ersten Tag des nächsten Monats (00:00:00)
        LocalDateTime startOfNextMonth = date.plusMonths(1).withDayOfMonth(1).atStartOfDay();
        List<DrivenRoute> drivenRoutes = drivenRoureRepository.findDrivenRoutesInMonth(startOfMonth, startOfNextMonth).get();
        return drivenRoutes.stream()
                .map(this::convertToDto)
                .toList();
    }

    public boolean deletDrivenRoutesByIds(List<DrivenRouteDto> drivenRoutes) {
        System.err.println("DELET DRIVENROUTES");
        List<Long> ids = new ArrayList<Long>();
        drivenRoutes.forEach(dRoute -> {
            System.err.println("dRoute.getDrivenRouteId()  " + dRoute.getDrivenRouteId() );
            drivenRoureRepository.deleteById(dRoute.getDrivenRouteId());
        });
        System.err.println("IDS " + ids);
        
        return true;
    }

}
