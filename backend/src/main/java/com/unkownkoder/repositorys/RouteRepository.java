package com.unkownkoder.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unkownkoder.models.Address;
import com.unkownkoder.models.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{
    Optional<Route> findByName(String name);
    Optional<Route> findByRouteId(Long routeId);
    Optional<Route> findByStartAddress(Address startAddress);
    Optional<Route> findByDestinationAddress(Address destinationAddress);

}
