package com.ecxample.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecxample.models.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>{
    Optional<Place> findByName(String name);
    Optional<Place> findByPlaceId(Long placeId);

}
