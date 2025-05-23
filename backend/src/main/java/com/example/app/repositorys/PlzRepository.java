package com.example.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Plz;

@Repository
public interface PlzRepository extends JpaRepository<Plz, Long>{
    Optional<Plz> findByPlz(String plz);
    Optional<Plz> findByPlzId(Long plzId);

}
