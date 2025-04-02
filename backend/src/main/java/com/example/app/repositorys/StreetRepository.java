package com.example.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Street;

@Repository
public interface StreetRepository extends  JpaRepository<Street, Long>{
    Optional<Street> findByStreetName(String streetName);
    Optional<Street> findByStreetId(Long streetId);

}