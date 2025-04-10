package com.example.app.repositorys;

import java.sql.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.DrivenRoute;
import com.example.app.models.Route;

@Repository
public interface DrivenRoureRepository extends JpaRepository<DrivenRoute, Long>{
    Optional<DrivenRoute> findByDrivenRouteId(Long drivenRouteId);
    Optional<DrivenRoute> findByDate(Date date);
    Optional<DrivenRoute> findByRoute(Route route);

}
