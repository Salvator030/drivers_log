package com.unkownkoder.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unkownkoder.models.Street;

@Repository
public interface SteetRepository extends  JpaRepository<Street, Long>{
    Optional<Street> findByStreetName(String streetName);
    Optional<Street> findByStreetId(Long streetId);

}