package com.example.app.repositorys;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.app.models.DrivenRoute;
import com.example.app.models.Route;


public interface DrivenRoureRepository extends BaseRepository<DrivenRoute, Long> {

    Optional<DrivenRoute> findByDrivenRouteId(Long drivenRouteId);

    Optional<DrivenRoute> findByDate(Date date);

    Optional<DrivenRoute> findByRoute(Route route);

    List<DrivenRoute> findByDateBetween(LocalDateTime startDatum, LocalDateTime endDatum);

    void deleteById(Long id);

    @Query("SELECT route FROM DrivenRoute route "
            + "WHERE route.date >= :startOfMonth "
            + "AND route.date < :startOfNextMonth")
            Optional<List<DrivenRoute>> findDrivenRoutesInMonth(
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("startOfNextMonth") LocalDateTime startOfNextMonth
    );
}
