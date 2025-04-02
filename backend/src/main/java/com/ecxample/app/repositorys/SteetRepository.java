package com.ecxample.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecxample.app.models.Street;

@Repository
public interface SteetRepository extends  JpaRepository<Street, Long>{
    Optional<Street> findByStreetName(String streetName);
    Optional<Street> findByStreetId(Long streetId);

}