package com.example.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Address;
import com.example.app.models.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{
    Optional<Route> findByName(String name);
    Optional<Route> findByRouteId(Long routeId);
    Optional<Route> findByStartAddress(Address startAddress);
    Optional<Route> findByDestinationAddress(Address destinationAddress);

}
